
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChatHeader } from "./chatbot/ChatHeader";
import { ChatMessages } from "./chatbot/ChatMessages";
import { ChatInput } from "./chatbot/ChatInput";
import { useChatbot } from "./chatbot/useChatbot";
import { useEffect, useState } from "react";
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
        // Auto-hide notification after 10 seconds
        const hideTimer = setTimeout(() => {
          setShowNotification(false);
        }, 10000);
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
          <div className="absolute bottom-20 right-0 mb-2 animate-bounce-slow">
            <div className="relative">
              <div className="w-56 p-3 rounded-lg shadow-lg bg-gradient-to-r from-theme-purple to-theme-blue text-white">
                <div className="absolute -bottom-2 right-6 w-0 h-0 border-8 border-solid border-theme-purple border-t-transparent border-r-transparent border-b-theme-purple border-l-transparent transform rotate-180"></div>
                <AlertDescription className="text-sm font-bold drop-shadow-md">
                  Butuh bantuan?
                </AlertDescription>
              </div>
            </div>
          </div>
        )}
        
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-full w-16 h-16 p-0 shadow-lg",
            isOpen 
              ? "bg-gray-600 hover:bg-gray-700" 
              : "bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90 overflow-hidden"
          )}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <img 
              src="/lovable-uploads/5124f14c-8aff-4401-99b7-a71f7b16f696.png"
              alt="Chatbot"
              className="h-12 w-12 object-contain"
            />
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
