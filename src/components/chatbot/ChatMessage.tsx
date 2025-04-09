
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const ChatMessage = ({ content, sender, timestamp }: ChatMessageProps) => {
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
          "py-2 px-3 rounded-lg",
          sender === "user"
            ? "bg-theme-purple text-white rounded-tr-none"
            : "bg-white border border-gray-200 rounded-tl-none"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <p className="text-[10px] opacity-70 mt-1">
          {new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
          }).format(timestamp)}
        </p>
      </div>
      {sender === "user" && (
        <div className="bg-theme-blue rounded-full p-1.5 text-white flex-shrink-0">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};
