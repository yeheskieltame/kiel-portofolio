
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChatHeader } from "./chatbot/ChatHeader";
import { ChatMessages } from "./chatbot/ChatMessages";
import { ChatInput } from "./chatbot/ChatInput";
import { useChatbot } from "./chatbot/useChatbot";

const Chatbot = () => {
  const { 
    isOpen, 
    setIsOpen,
    messages, 
    isLoading, 
    ttsEnabled,
    ttsLanguage,
    handleSendMessage, 
    handleConfigureTts,
    toggleTts,
    switchLanguage,
    speakText
  } = useChatbot();

  return (
    <>
      {/* Chat button (fixed position) */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-16 right-8 z-50 rounded-full w-20 h-20 p-0 shadow-lg bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90",
          isOpen && "bg-gray-600 hover:bg-gray-700"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-8 w-8" />
        ) : (
          <MessageCircle className="h-8 w-8" />
        )}
      </Button>

      {/* Chatbot dialog */}
      <div
        className={cn(
          "fixed bottom-10 right-8 mb-16 z-40 w-full max-w-[90vw] sm:max-w-[400px] transition-all duration-300 ease-in-out transform",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
        )}
      >
        <Card className="flex flex-col h-[500px] shadow-2xl border border-theme-purple/30">
          <ChatHeader 
            onConfigureTts={handleConfigureTts}
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
