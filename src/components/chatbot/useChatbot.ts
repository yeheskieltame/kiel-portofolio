
import { useState, useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import { Message } from "./types";
import { textToSpeech, stopSpeech } from "./audioUtils";

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm Yeheskiel's assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  // Set the default webhook URL
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState("https://kieltame.app.n8n.cloud/webhook/643ff32a-6743-4406-a9f5-573a3120ff03");
  
  // TTS related states
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsLanguage, setTtsLanguage] = useState<"id" | "en">("en");
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load settings from localStorage if available
  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem("n8nWebhookUrl");
    if (savedWebhookUrl) {
      setN8nWebhookUrl(savedWebhookUrl);
    } else {
      // Save the default webhook URL to localStorage
      localStorage.setItem("n8nWebhookUrl", n8nWebhookUrl);
    }

    // Load TTS settings
    const savedTtsEnabled = localStorage.getItem("ttsEnabled");
    if (savedTtsEnabled) {
      setTtsEnabled(savedTtsEnabled === "true");
    }

    const savedTtsLanguage = localStorage.getItem("ttsLanguage") as "id" | "en" | null;
    if (savedTtsLanguage) {
      setTtsLanguage(savedTtsLanguage);
    }

    const savedApiKey = localStorage.getItem("elevenLabsApiKey");
    if (savedApiKey) {
      setElevenLabsApiKey(savedApiKey);
    }
  }, []);

  // Save TTS settings when they change
  useEffect(() => {
    localStorage.setItem("ttsEnabled", ttsEnabled.toString());
    localStorage.setItem("ttsLanguage", ttsLanguage);
    if (elevenLabsApiKey) {
      localStorage.setItem("elevenLabsApiKey", elevenLabsApiKey);
    }
  }, [ttsEnabled, ttsLanguage, elevenLabsApiKey]);

  // When a new bot message is added, read it out if TTS is enabled
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (ttsEnabled && lastMessage && lastMessage.sender === "bot" && !isLoading) {
      speakText(lastMessage.content);
    }
  }, [messages, ttsEnabled, isLoading]);

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      stopSpeech(currentAudioRef.current);
    };
  }, []);

  const speakText = async (text: string) => {
    // Stop any currently playing speech
    stopSpeech(currentAudioRef.current);
    
    // Start new speech
    setIsSpeaking(true);
    const audio = await textToSpeech(text, elevenLabsApiKey, ttsLanguage);
    
    if (audio) {
      currentAudioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
        toast({
          title: "Playback Error",
          description: "There was an error playing the audio",
          variant: "destructive",
        });
      };
      
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsSpeaking(false);
        currentAudioRef.current = null;
      });
    } else {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    stopSpeech(currentAudioRef.current);
    setIsSpeaking(false);
    currentAudioRef.current = null;
  };

  const handleSendMessage = async (inputMessage: string) => {
    // Check if n8n webhook URL is set
    if (!n8nWebhookUrl) {
      toast({
        title: "Webhook URL not set",
        description: "Please set your n8n webhook URL in the settings",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Stop any ongoing speech when user sends a message
    stopSpeaking();

    try {
      // Send message to n8n webhook
      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          timestamp: new Date().toISOString(),
        }),
      });

      // Process the response from n8n
      const data = await response.json();
      console.log("Response from n8n:", data);
      
      // Extract the response from the n8n response
      let botReply = "Sorry, I couldn't process your request.";
      
      // Parse the response properly based on the n8n workflow structure
      if (data) {
        console.log("Response structure:", JSON.stringify(data));
        
        // Check if data is an object with keys (based on the console logs)
        if (typeof data === 'object' && data !== null) {
          // Get the first key in the object (which appears to be the message content)
          const firstKey = Object.keys(data)[0];
          if (firstKey) {
            // If the object has a nested structure with an output property
            if (data[firstKey] && data[firstKey].output) {
              botReply = data[firstKey].output;
            } else {
              // Otherwise, use the key itself which contains the message
              botReply = firstKey;
            }
          }
        } else if (typeof data === 'string') {
          // If data is directly a string
          botReply = data;
        }
      }

      console.log("Extracted bot reply:", botReply);

      // Add bot reply to chat
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botReply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message to n8n:", error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Sorry, I'm having trouble connecting. Please check your n8n webhook configuration and try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to send message to n8n. Check your webhook URL.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigureWebhook = () => {
    const url = prompt("Enter your n8n webhook URL:", n8nWebhookUrl);
    if (url !== null) {
      setN8nWebhookUrl(url);
      localStorage.setItem("n8nWebhookUrl", url);
      toast({
        title: "Webhook URL updated",
        description: "Your n8n webhook URL has been saved.",
      });
    }
  };

  const handleConfigureTts = () => {
    const apiKey = prompt("Enter your ElevenLabs API key:", elevenLabsApiKey || "");
    if (apiKey !== null) {
      setElevenLabsApiKey(apiKey);
      toast({
        title: "API Key updated",
        description: "Your ElevenLabs API key has been saved.",
      });
    }
  };

  const toggleTts = () => {
    if (!ttsEnabled && !elevenLabsApiKey) {
      handleConfigureTts();
    }
    setTtsEnabled(prev => !prev);
  };

  const switchLanguage = () => {
    setTtsLanguage(prev => prev === "en" ? "id" : "en");
    toast({
      title: "Language switched",
      description: `Text-to-speech language set to ${ttsLanguage === "en" ? "Indonesian" : "English"}`,
    });
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    ttsEnabled,
    ttsLanguage,
    isSpeaking,
    handleSendMessage,
    handleConfigureWebhook,
    handleConfigureTts,
    toggleTts,
    switchLanguage,
    speakText,
    stopSpeaking
  };
};
