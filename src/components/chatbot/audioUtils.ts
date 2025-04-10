
import { toast } from "@/components/ui/use-toast";

interface SpeechOptions {
  voice_id: string;
  model_id: string;
  text: string;
}

export async function textToSpeech(
  text: string,
  apiKey: string | null,
  language: "id" | "en" = "en"
): Promise<HTMLAudioElement | null> {
  if (!apiKey) {
    toast({
      title: "API Key Missing",
      description: "Please configure your ElevenLabs API key in settings",
      variant: "destructive",
    });
    return null;
  }

  // Select appropriate voice and model based on language
  const voiceId = language === "id" 
    ? "XB0fDUnXU5powFXDhCwa" // Charlotte voice for Indonesian
    : "EXAVITQu4vr4xnSDxMaL"; // Sarah voice for English
  
  const modelId = "eleven_multilingual_v2"; // Multilingual model for both languages

  try {
    const options: SpeechOptions = {
      voice_id: voiceId,
      model_id: modelId,
      text: text
    };

    const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voiceId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    return audio;
  } catch (error) {
    console.error("Error with text-to-speech:", error);
    toast({
      title: "Text-to-Speech Error",
      description: "Failed to convert text to speech. Please try again.",
      variant: "destructive",
    });
    return null;
  }
}

export function stopSpeech(audio: HTMLAudioElement | null) {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}
