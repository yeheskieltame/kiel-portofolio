
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm Yeheskiel's assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load webhook URL from localStorage if available
  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem("n8nWebhookUrl");
    if (savedWebhookUrl) {
      setN8nWebhookUrl(savedWebhookUrl);
    }
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputMessage.trim()) return;

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
    setInputMessage("");
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

      let botReply: string;
      
      try {
        const data = await response.json();
        botReply = data.response || "Sorry, I couldn't process your request.";
      } catch (error) {
        // If we can't parse the response as JSON, use a default message
        console.log("Couldn't parse response as JSON, using default message");
        botReply = "Thank you for your message! I'll get back to you soon.";
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
        content: "Sorry, I'm having trouble connecting. Please try again later.",
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

  return (
    <>
      {/* Chat button (fixed position) */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-lg bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90",
          isOpen && "bg-gray-600 hover:bg-gray-700"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chatbot dialog */}
      <div
        className={cn(
          "fixed bottom-6 right-6 mb-16 z-40 w-full max-w-[90vw] sm:max-w-[400px] transition-all duration-300 ease-in-out transform",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
        )}
      >
        <Card className="flex flex-col h-[500px] shadow-2xl border border-theme-purple/30">
          {/* Chat header */}
          <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-theme-purple to-theme-blue">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-white" />
              <h3 className="font-medium text-white">Chat with Yeheskiel's Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleConfigureWebhook}
              className="h-8 w-8 text-white hover:bg-white/20"
              title="Configure Webhook URL"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </Button>
          </div>

          {/* Chat messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start gap-2 max-w-[85%]",
                  msg.sender === "user" ? "ml-auto" : "mr-auto"
                )}
              >
                {msg.sender === "bot" && (
                  <div className="bg-theme-purple rounded-full p-1.5 text-white flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "py-2 px-3 rounded-lg",
                    msg.sender === "user"
                      ? "bg-theme-purple text-white rounded-tr-none"
                      : "bg-white border border-gray-200 rounded-tl-none"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-[10px] opacity-70 mt-1">
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(msg.timestamp)}
                  </p>
                </div>
                {msg.sender === "user" && (
                  <div className="bg-theme-blue rounded-full p-1.5 text-white flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Chatbot;
