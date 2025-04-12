
import { useState, useEffect } from "react";
import { useSettings } from "./useSettings";
import { useAudioControl } from "./useAudioControl";
import { useMessages } from "./useMessages";

export const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    ttsEnabled,
    ttsLanguage,
    elevenLabsApiKey,
    handleConfigureTts,
    toggleTts,
    switchLanguage
  } = useSettings();
  
  const {
    isSpeaking,
    speakText,
    stopSpeaking
  } = useAudioControl(ttsEnabled, elevenLabsApiKey, ttsLanguage);
  
  const {
    messages,
    isLoading,
    handleSendMessage
  } = useMessages(stopSpeaking);

  // When a new bot message is added, read it out if TTS is enabled
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (ttsEnabled && lastMessage && lastMessage.sender === "bot" && !isLoading) {
      speakText(lastMessage.content);
    }
  }, [messages, ttsEnabled, isLoading]);

  return {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    ttsEnabled,
    ttsLanguage,
    isSpeaking,
    handleSendMessage,
    handleConfigureTts,
    toggleTts,
    switchLanguage,
    speakText,
    stopSpeaking
  };
};
