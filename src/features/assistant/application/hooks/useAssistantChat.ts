import { useState, useCallback } from "react";
import type { ConversationMessage } from "@/features/assistant/domain/types/assistant.types";
import { assistantLlmService } from "@/features/assistant/infrastructure/services/assistantLlm.service";
import { assistantAudioService } from "@/features/assistant/infrastructure/services/assistantAudio.service";

export function useAssistantChat() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (userInput: string) => {
      if (!userInput.trim()) return;

      setError(null);
      setIsProcessing(true);

      try {
        const userMessage: ConversationMessage = {
          id: Date.now().toString(),
          role: "user",
          content: userInput,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMessage]);

        const response = await assistantLlmService.chat([
          ...messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
          { role: "user", content: userInput },
        ]);

        const assistantMessage: ConversationMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        await assistantAudioService.speak(response);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Error desconocido";
        setError(errorMsg);
        console.error("[useAssistantChat]", errorMsg);
      } finally {
        setIsProcessing(false);
      }
    },
    [messages],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isProcessing,
    error,
    sendMessage,
    clearMessages,
  };
}
