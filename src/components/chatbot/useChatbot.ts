import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Message } from "./types";

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
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState("");

  // Load webhook URL from localStorage if available
  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem("n8nWebhookUrl");
    if (savedWebhookUrl) {
      setN8nWebhookUrl(savedWebhookUrl);
    }
  }, []);

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

  return {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    handleSendMessage,
    handleConfigureWebhook,
  };
};
