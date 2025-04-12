
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export const useSettings = () => {
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [ttsLanguage, setTtsLanguage] = useState<"id" | "en">("en");
  // Hardcoded ElevenLabs API key
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string>("sk_e0911c61be42e23722e578076ecda0ba2ba729b1b3f39147");

  // Load TTS settings from localStorage if available
  useEffect(() => {
    // Load TTS settings
    const savedTtsEnabled = localStorage.getItem("ttsEnabled");
    if (savedTtsEnabled) {
      setTtsEnabled(savedTtsEnabled === "true");
    }

    const savedTtsLanguage = localStorage.getItem("ttsLanguage") as "id" | "en" | null;
    if (savedTtsLanguage) {
      setTtsLanguage(savedTtsLanguage);
    }
    
    // No longer loading API key from localStorage as we're using a hardcoded key
  }, []);

  // Save TTS settings when they change
  useEffect(() => {
    localStorage.setItem("ttsEnabled", ttsEnabled.toString());
    localStorage.setItem("ttsLanguage", ttsLanguage);
    // No longer saving API key to localStorage
  }, [ttsEnabled, ttsLanguage]);

  // Remove the handleConfigureTts function as it's no longer needed
  const toggleTts = () => {
    setTtsEnabled(prev => !prev);
  };

  const switchLanguage = () => {
    setTtsLanguage(prev => prev === "en" ? "id" : "en");
    toast({
      title: "Language switched",
      description: `Text-to-speech language set to ${ttsLanguage === "en" ? "Indonesian" : "English"}`,
    });
  };

  return {
    ttsEnabled,
    ttsLanguage,
    elevenLabsApiKey,
    toggleTts,
    switchLanguage,
    // Remove handleConfigureTts from returned object
  };
};
