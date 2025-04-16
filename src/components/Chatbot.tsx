
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChatHeader } from "./chatbot/ChatHeader";
import { ChatMessages } from "./chatbot/ChatMessages";
import { ChatInput } from "./chatbot/ChatInput";
import { useChatbot } from "./chatbot/useChatbot";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Chatbot = () => {
  const { 
    isOpen, 
    setIsOpen,
    messages, 
    isLoading, 
    ttsEnabled,
    ttsLanguage,
    handleSendMessage, 
    toggleTts,
    switchLanguage,
    speakText
  } = useChatbot();

  const [showNotification, setShowNotification] = useState(false);
  
  // Show notification after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
        // Auto-hide notification after 7 seconds
        const hideTimer = setTimeout(() => {
          setShowNotification(false);
        }, 7000);
        return () => clearTimeout(hideTimer);
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Hide notification when chat is opened
  useEffect(() => {
    if (isOpen) {
      setShowNotification(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* Chat button (fixed position) */}
      <div className="fixed bottom-8 right-8 z-50">
        {showNotification && (
          <Alert className="absolute bottom-20 right-0 w-48 mb-2 bg-white border border-theme-purple/30 p-3 rounded-lg shadow-lg animate-fade-in">
            <AlertDescription className="text-sm font-medium">
              Butuh bantuan?
            </AlertDescription>
          </Alert>
        )}
        
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-full w-16 h-16 p-0 shadow-lg bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90",
            isOpen && "bg-gray-600 hover:bg-gray-700"
          )}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Bot className="h-7 w-7" />
          )}
        </Button>
      </div>

      {/* Chatbot dialog */}
      <div
        className={cn(
          "fixed bottom-28 right-8 z-40 w-full max-w-[90vw] sm:max-w-[400px] transition-all duration-300 ease-in-out transform",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
        )}
      >
        <Card className="flex flex-col h-[500px] shadow-2xl border border-theme-purple/30">
          <ChatHeader 
            ttsEnabled={ttsEnabled}
            toggleTts={toggleTts}
            ttsLanguage={ttsLanguage}
            switchLanguage={switchLanguage}
          />
          <ChatMessages 
            messages={messages} 
            ttsEnabled={ttsEnabled}
            onSpeakMessage={speakText}
          />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </Card>
      </div>
    </>
  );
};

export default Chatbot;
