
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export const useSettings = () => {
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [ttsLanguage, setTtsLanguage] = useState<"id" | "en">("en");
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string | null>(null);

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

    const savedApiKey = localStorage.getItem("elevenLabsApiKey");
    if (savedApiKey) {
      setElevenLabsApiKey(savedApiKey);
    }
  }, []);

  // Save TTS settings when they change
  useEffect(() => {
    localStorage.setItem("ttsEnabled", ttsEnabled.toString());
    localStorage.setItem("ttsLanguage", ttsLanguage);
    if (elevenLabsApiKey) {
      localStorage.setItem("elevenLabsApiKey", elevenLabsApiKey);
    }
  }, [ttsEnabled, ttsLanguage, elevenLabsApiKey]);

  const handleConfigureTts = () => {
    const apiKey = prompt("Enter your ElevenLabs API key:", elevenLabsApiKey || "");
    if (apiKey !== null) {
      setElevenLabsApiKey(apiKey);
      toast({
        title: "API Key updated",
        description: "Your ElevenLabs API key has been saved.",
      });
    }
  };

  const toggleTts = () => {
    if (!ttsEnabled && !elevenLabsApiKey) {
      handleConfigureTts();
    }
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
    handleConfigureTts,
    toggleTts,
    switchLanguage
  };
};
