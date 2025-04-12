
import { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { textToSpeech, stopSpeech } from "../audioUtils";

export const useAudioControl = (ttsEnabled: boolean, elevenLabsApiKey: string | null, ttsLanguage: "id" | "en") => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      stopSpeech(currentAudioRef.current);
    };
  }, []);

  const speakText = async (text: string) => {
    // Stop any currently playing speech
    stopSpeech(currentAudioRef.current);
    
    // Start new speech
    setIsSpeaking(true);
    const audio = await textToSpeech(text, elevenLabsApiKey, ttsLanguage);
    
    if (audio) {
      currentAudioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
        toast({
          title: "Playback Error",
          description: "There was an error playing the audio",
          variant: "destructive",
        });
      };
      
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsSpeaking(false);
        currentAudioRef.current = null;
      });
    } else {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    stopSpeech(currentAudioRef.current);
    setIsSpeaking(false);
    currentAudioRef.current = null;
  };

  return {
    isSpeaking,
    speakText,
    stopSpeaking
  };
};
