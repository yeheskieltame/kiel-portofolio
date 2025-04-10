
import { cn } from "@/lib/utils";
import { Bot, User, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  onSpeakMessage?: (message: string) => void;
  ttsEnabled?: boolean;
}

export const ChatMessage = ({ 
  content, 
  sender, 
  timestamp, 
  onSpeakMessage,
  ttsEnabled 
}: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-2 max-w-[85%]",
        sender === "user" ? "ml-auto" : "mr-auto"
      )}
    >
      {sender === "bot" && (
        <div className="bg-theme-purple rounded-full p-1.5 text-white flex-shrink-0">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          "py-2 px-3 rounded-lg relative",
          sender === "user"
            ? "bg-theme-purple text-white rounded-tr-none"
            : "bg-white border border-gray-200 rounded-tl-none"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[10px] opacity-70">
            {new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
            }).format(timestamp)}
          </p>
          
          {sender === "bot" && ttsEnabled && onSpeakMessage && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 ml-2"
              onClick={() => onSpeakMessage(content)}
              title="Speak this message"
            >
              <Volume2 className="h-3 w-3 opacity-70 hover:opacity-100" />
            </Button>
          )}
        </div>
      </div>
      {sender === "user" && (
        <div className="bg-theme-blue rounded-full p-1.5 text-white flex-shrink-0">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};
