
import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  ttsEnabled?: boolean;
  onSpeakMessage?: (message: string) => void;
}

export const ChatMessages = ({ messages, ttsEnabled, onSpeakMessage }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Process messages
  const processedMessages = messages.map(msg => {
    return msg;
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {processedMessages.map((msg) => (
        <ChatMessage
          key={msg.id}
          content={msg.content}
          sender={msg.sender}
          timestamp={msg.timestamp}
          onSpeakMessage={onSpeakMessage}
          ttsEnabled={ttsEnabled}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
