
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Message } from "../types";

export const useMessages = (stopSpeaking: () => void) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm Yeheskiel's assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Groq API key (replace n8n webhook)
  const groqApiKey = "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";

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
      // Send message to Groq API
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: "You are Yeheskiel Tame's assistant. You help answer questions about his services, projects, skills, and experience. Be friendly, helpful, and professional. If you don't know something specific about Yeheskiel, you can say so and try to answer based on the general knowledge you have. Always refer to Yeheskiel as 'Kiel Tame' in responses."
            },
            {
              role: "user",
              content: inputMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      console.log("Response from Groq:", data);
      
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to get response from Groq");
      }
      
      // Extract the response from Groq
      const botReply = data.choices && data.choices[0]?.message?.content || 
                      "Sorry, I couldn't process your request.";

      // Add bot reply to chat
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botReply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message to Groq:", error);
      
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
        description: "Failed to get response from AI assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    handleSendMessage
  };
};
