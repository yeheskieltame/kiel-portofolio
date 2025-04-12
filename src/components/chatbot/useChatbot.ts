
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
  // Set the fixed webhook URL - no longer configurable by users
  const n8nWebhookUrl = "https://kieltame.app.n8n.cloud/webhook/643ff32a-6743-4406-a9f5-573a3120ff03";
  
  // TTS related states
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsLanguage, setTtsLanguage] = useState<"id" | "en">("en");
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load TTS settings from localStorage if available
  useEffect(() => {
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
      
      // Improved parsing logic to handle various n8n response structures
      if (data) {
        console.log("Response structure:", JSON.stringify(data));
        
        // Check if data is an array (new n8n format)
        if (Array.isArray(data) && data.length > 0 && data[0].output) {
          botReply = data[0].output;
        }
        // Check if data is an object with nested structure
        else if (typeof data === 'object' && data !== null) {
          // Try to find the 'output' property at any level
          const findOutput = (obj: any): string | null => {
            if (obj && typeof obj === 'object') {
              // If the object has an output property directly
              if (obj.output && typeof obj.output === 'string') {
                return obj.output;
              }
              
              // Recursively look for the output in nested properties
              for (const key in obj) {
                if (typeof obj[key] === 'object') {
                  const found = findOutput(obj[key]);
                  if (found) return found;
                }
              }
            }
            return null;
          };
          
          const output = findOutput(data);
          if (output) {
            botReply = output;
          } else {
            // Fall back to first key if we can't find an output property
            const firstKey = Object.keys(data)[0];
            if (firstKey && typeof firstKey === 'string') {
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
        content: "Sorry, I'm having trouble connecting. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to send message to n8n webhook.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
    handleConfigureTts,
    toggleTts,
    switchLanguage,
    speakText,
    stopSpeaking
  };
};
