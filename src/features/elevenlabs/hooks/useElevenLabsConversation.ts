import {
  useConversation,
  type ConversationStatus,
  type Callbacks,
} from "@elevenlabs/react-native";
import { useRef, useEffect, useState } from "react";
import {
  getElevenLabsConfig,
  hasValidAgentId,
} from "@/features/elevenlabs/config/elevenlabs.config";

const MAX_RECONNECT_ATTEMPTS = 3;

/**
 * Estado devuelto por el hook useElevenLabsConversation
 */
export interface ConversationState {
  isConnected: boolean;
  isAgentThinking: boolean;
  isMicMuted: boolean;
  isMicActive: boolean;
  status: ConversationStatus;
  isStarting: boolean;
  error: string | null;
  startSession: (config: { agentId?: string; [key: string]: any }) => Promise<void>;
  endSession: (reason?: "user" | "agent") => Promise<void>;
  sendMessage: (text: string) => void;
  sendContextualUpdate: (text: string) => void;
  setMicMuted: (muted: boolean) => void;
}

/**
 * Función auxiliar para extraer mensaje de error de un valor desconocido
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String((error as any).message);
  }
  return "Error desconocido";
};

/**
 * Hook para gestionar IA conversacional de ElevenLabs
 * Gestiona conexión, gestión de estado y manejo de errores
 *
 * @returns {ConversationState} Estado de conversación y métodos de control
 * @throws {Error} Si agent_id no está configurado en app.json
 */
export const useElevenLabsConversation = (): ConversationState => {
  const config = getElevenLabsConfig();
  const isValidAgentId = hasValidAgentId(config.agentId);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(true);
  const [isSessionConnected, setIsSessionConnected] = useState<boolean>(false);
  const [isAutoReconnectBlocked, setIsAutoReconnectBlocked] = useState<boolean>(false);
  const hasInitialized = useRef<boolean>(false);
  const reconnectAttempts = useRef<number>(0);
  const isManualDisconnect = useRef<boolean>(false);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stableConnectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!isValidAgentId) {
    console.error(
      "ElevenLabs agent_id no configurado o inválido en app.json. Agrega un agent_id válido en expo.extra.elevenlabs.agent_id",
    );
  }

  // Devoluciones de llamada para conversación - correctamente tipificadas desde ElevenLabs SDK
  const conversationCallbacks: Partial<Callbacks> = {
    onConnect: () => {
      console.log("✅ Conectado al Agente de ElevenLabs");
      setError(null);
      setIsStarting(false);
      setIsSessionConnected(true);
      isManualDisconnect.current = false;
      setIsAutoReconnectBlocked(false);

      if (stableConnectionTimerRef.current) {
        clearTimeout(stableConnectionTimerRef.current);
      }

      stableConnectionTimerRef.current = setTimeout(() => {
        reconnectAttempts.current = 0;
      }, 8000);
    },
    onDisconnect: () => {
      console.log("❌ Desconectado del Agente de ElevenLabs");
      setIsStarting(false);
      setIsSessionConnected(false);
      setIsMicMuted(true);

      if (stableConnectionTimerRef.current) {
        clearTimeout(stableConnectionTimerRef.current);
      }
    },
    onError: (error: unknown) => {
      console.error("Error de ElevenLabs:", error);
      setIsStarting(false);
      setIsSessionConnected(false);
      const rawMessage = getErrorMessage(error);
      const message = rawMessage.includes("WebSocket")
        ? "Conexión inestable con ElevenLabs (WebSocket). Reintentando..."
        : rawMessage;
      setError(message);
    },
  };

  // Inicializar conversación de ElevenLabs con devoluciones de llamada tipificadas
  const conversation = useConversation(conversationCallbacks);

  // Validación inicial y limpieza de timers
  useEffect(() => {
    if (!isValidAgentId) {
      setError(
        "Configura un agent_id válido de ElevenLabs para iniciar la conversación.",
      );
    }

    return (): void => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (stableConnectionTimerRef.current) {
        clearTimeout(stableConnectionTimerRef.current);
      }
    };
  }, [isValidAgentId]);

  useEffect(() => {
    if (reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
      setIsAutoReconnectBlocked(true);
      setIsStarting(false);
      setIsSessionConnected(false);
      setIsMicMuted(true);
      hasInitialized.current = false;
      setError("No se pudo establecer conexión. Pulsa el micrófono para reintentar.");
      void conversation.endSession("agent").catch(() => undefined);
      return;
    }

    if (
      conversation.status !== "disconnected" ||
      !hasInitialized.current ||
      !isValidAgentId ||
      !config.agentId ||
      isManualDisconnect.current ||
      isAutoReconnectBlocked ||
      isStarting ||
      reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS
    ) {
      return;
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectAttempts.current += 1;
      setIsStarting(true);
      void conversation
        .startSession({ agentId: config.agentId })
        .catch((err: unknown) => {
          const message = getErrorMessage(err);
          setError(
            `No se pudo reconectar (${reconnectAttempts.current}/${MAX_RECONNECT_ATTEMPTS}): ${message}`,
          );
        })
        .finally(() => {
          setIsStarting(false);
        });
    }, 1200);

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [
    conversation,
    conversation.status,
    config.agentId,
    isAutoReconnectBlocked,
    isStarting,
    isValidAgentId,
  ]);

  const startSessionWithReset: ConversationState["startSession"] = async (
    sessionConfig,
  ) => {
    if (!isValidAgentId) {
      setError(
        "Configura un agent_id válido de ElevenLabs para iniciar la conversación.",
      );
      throw new Error("agent_id inválido");
    }

    isManualDisconnect.current = false;
    hasInitialized.current = true;
    reconnectAttempts.current = 0;
    setIsAutoReconnectBlocked(false);
    setError(null);
    setIsStarting(true);
    setIsSessionConnected(false);

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (stableConnectionTimerRef.current) {
      clearTimeout(stableConnectionTimerRef.current);
    }

    try {
      await conversation.startSession({
        ...sessionConfig,
        agentId: sessionConfig.agentId ?? config.agentId,
      });
      conversation.setMicMuted(true);
      setIsMicMuted(true);
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setIsStarting(false);
    }
  };

  const endSessionWithReason: ConversationState["endSession"] = async (reason) => {
    isManualDisconnect.current = true;
    hasInitialized.current = false;
    setIsStarting(false);
    setIsSessionConnected(false);
    setIsMicMuted(true);
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (stableConnectionTimerRef.current) {
      clearTimeout(stableConnectionTimerRef.current);
    }
    await conversation.endSession(reason);
  };

  const setMicMutedWithState: ConversationState["setMicMuted"] = (muted) => {
    conversation.setMicMuted(muted);
    setIsMicMuted(muted);
  };

  const effectiveStatus: ConversationStatus = isAutoReconnectBlocked
    ? "disconnected"
    : conversation.status;

  return {
    // Estado de conexión
    isConnected: isSessionConnected && effectiveStatus === "connected",
    isAgentThinking: conversation.isSpeaking,
    isMicMuted,
    isMicActive: isSessionConnected && effectiveStatus === "connected" && !isMicMuted,
    status: effectiveStatus,
    isStarting,
    error,

    // Métodos
    startSession: startSessionWithReset,
    endSession: endSessionWithReason,
    sendMessage: conversation.sendUserMessage,
    sendContextualUpdate: conversation.sendContextualUpdate,
    setMicMuted: setMicMutedWithState,
  };
};
