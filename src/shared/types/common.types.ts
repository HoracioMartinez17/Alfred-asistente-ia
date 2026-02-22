/**
 * Tipos compartidos en toda la app
 */

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface AssistantState {
  isListening: boolean;
  isProcessing: boolean;
  error: string | null;
  lastMessage: Message | null;
}

export type AsyncStatus = "idle" | "loading" | "success" | "error";
