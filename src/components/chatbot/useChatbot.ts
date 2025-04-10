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
      let data;
      try {
        data = await response.json();
        console.log("Raw response from n8n:", data);
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        throw new Error("Failed to parse webhook response");
      }

      // Extract the response from the n8n response
      let botReply = "Sorry, I couldn't process your request.";

      // Improved response handling logic
      if (data) {
        console.log("Response structure:", JSON.stringify(data));

        if (Array.isArray(data)) {
          // Handle array response format
          if (data.length > 0) {
            const firstItem = data[0];
            
            if (typeof firstItem === 'object' && firstItem !== null) {
              // Check for output property
              if (firstItem.output && typeof firstItem.output === 'string') {
                botReply = firstItem.output;
                console.log("Extracted from array.output, length:", botReply.length);
              } else if (firstItem.text && typeof firstItem.text === 'string') {
                botReply = firstItem.text;
                console.log("Extracted from array.text, length:", botReply.length);
              } else if (firstItem.message && typeof firstItem.message === 'string') {
                botReply = firstItem.message;
                console.log("Extracted from array.message, length:", botReply.length);
              } else {
                // Try to stringify the object if it has no known properties
                try {
                  botReply = JSON.stringify(firstItem);
                  console.log("Stringified first array item, length:", botReply.length);
                } catch (e) {
                  console.error("Failed to stringify first array item:", e);
                }
              }
            } else if (typeof firstItem === 'string') {
              // Direct string in array
              botReply = firstItem;
              console.log("Extracted string from array, length:", botReply.length);
            }
          }
        } else if (typeof data === 'object' && data !== null) {
          // Handle object response format
          if (data.output && typeof data.output === 'string') {
            botReply = data.output;
            console.log("Extracted from object.output, length:", botReply.length);
          } else if (data.text && typeof data.text === 'string') {
            botReply = data.text;
            console.log("Extracted from object.text, length:", botReply.length);
          } else if (data.message && typeof data.message === 'string') {
            botReply = data.message;
            console.log("Extracted from object.message, length:", botReply.length);
          } else {
            // Try to extract from first key
            const keys = Object.keys(data);
            if (keys.length > 0) {
              const firstKey = keys[0];
              const firstValue = data[firstKey];
              
              if (typeof firstValue === 'object' && firstValue !== null) {
                if (firstValue.output && typeof firstValue.output === 'string') {
                  botReply = firstValue.output;
                  console.log("Extracted from nested object.output, length:", botReply.length);
                } else if (firstValue.text && typeof firstValue.text === 'string') {
                  botReply = firstValue.text;
                  console.log("Extracted from nested object.text, length:", botReply.length);
                } else if (firstValue.message && typeof firstValue.message === 'string') {
                  botReply = firstValue.message;
                  console.log("Extracted from nested object.message, length:", botReply.length);
                }
              } else if (typeof firstValue === 'string') {
                botReply = firstValue;
                console.log("Extracted string from object value, length:", botReply.length);
              }
            }
          }
        } else if (typeof data === 'string') {
          // Handle direct string response
          botReply = data;
          console.log("Used direct string response, length:", botReply.length);
        }
      }

      // Check for empty or extremely short replies
      if (!botReply || botReply.length < 5) {
        console.warn("Suspiciously short reply detected:", botReply);
        // Try to use raw data as fallback
        try {
          botReply = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
          console.log("Using fallback raw data response, length:", botReply.length);
        } catch (e) {
          console.error("Failed to use raw data as fallback:", e);
          botReply = "Sorry, I received an incomplete response. Please try again.";
        }
      }

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