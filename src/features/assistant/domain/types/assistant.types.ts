/**
 * Tipos de dominio del feature assistant
 */

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  metadata?: {
    tokenCount?: number;
    model?: string;
  };
}

export interface AssistantScreenState {
  messages: ConversationMessage[];
  isListening: boolean;
  isProcessing: boolean;
  currentInput: string;
  error: string | null;
}
