import { useState, useCallback } from "react";
import { assistantAudioService } from "@/features/assistant/infrastructure/services/assistantAudio.service";

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(async () => {
    try {
      setError(null);
      setIsListening(true);
      setTranscript("");

      const result = await assistantAudioService.startListening();
      setTranscript(result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error de micrófono";
      setError(errorMsg);
      console.error("[useVoiceInput]", errorMsg);
    } finally {
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(async () => {
    try {
      await assistantAudioService.stopListening();
      setIsListening(false);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error al detener";
      setError(errorMsg);
    }
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    reset,
  };
}
