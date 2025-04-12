
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  ttsEnabled?: boolean;
  toggleTts?: () => void;
  ttsLanguage?: "id" | "en";
  switchLanguage?: () => void;
}

export const ChatHeader = ({ 
  ttsEnabled = false,
  toggleTts,
  ttsLanguage = "en",
  switchLanguage
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
      <div className="flex flex-col">
        <h3 className="font-semibold">Chat with Yeheskiel's Assistant</h3>
        <p className="text-xs text-muted-foreground">Ask me anything about projects & services</p>
      </div>
      <div className="flex gap-2">
        {toggleTts && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleTts}
            title={ttsEnabled ? "Disable voice" : "Enable voice"}
          >
            {ttsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        )}
        
        {ttsEnabled && switchLanguage && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={switchLanguage}
            title={`Current language: ${ttsLanguage === "en" ? "English" : "Indonesian"}`}
          >
            <span className="text-xs font-bold">{ttsLanguage.toUpperCase()}</span>
          </Button>
        )}
      </div>
    </div>
  );
};
