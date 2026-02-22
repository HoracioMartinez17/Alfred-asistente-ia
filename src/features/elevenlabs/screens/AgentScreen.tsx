import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, Animated } from "react-native";
import { useElevenLabsConversation } from "../hooks/useElevenLabsConversation";
import { styles } from "../styles/agent.styles";

export const AgentScreen = () => {
  const {
    isConnected,
    isAgentThinking,
    isMicMuted,
    isStarting,
    startSession,
    status,
    endSession,
    setMicMuted,
    error,
  } = useElevenLabsConversation();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Pulse animation cuando el agente está hablando
  useEffect(() => {
    if (isAgentThinking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isAgentThinking, pulseAnim]);

  const handleMicPress = async () => {
    try {
      if (isConnected) {
        const nextMuted = !isMicMuted;
        setMicMuted(nextMuted);
        return;
      }

      await startSession({});
      setMicMuted(false);
    } catch (err) {
      console.error("Error al gestionar el micrófono:", err);
    }
  };

  const handleCancelRecording = async () => {
    try {
      await endSession("user");
    } catch (err) {
      console.error("Error al finalizar sesión:", err);
    }
  };

  const getStatusInfo = () => {
    if (error) {
      return {
        label: "Error",
        text: error,
        color: "#EF4444",
      };
    }
    if (isStarting || status === "connecting") {
      return {
        label: "Estado",
        text: "Conectando...",
        color: "#6B7280",
      };
    }
    if (isAgentThinking) {
      return {
        label: "Estado",
        text: "Alfred está procesando...",
        color: "#FBBF24",
      };
    }
    if (isConnected && !isMicMuted) {
      return {
        label: "Estado",
        text: "Escuchando...",
        color: "#EF4444",
      };
    }
    if (isConnected) {
      return {
        label: "Estado",
        text: isMicMuted ? "Micrófono silenciado" : "Conectado y listo",
        color: "#10B981",
      };
    }
    return {
      label: "Estado",
      text: "Desconectado",
      color: "#6B7280",
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Alfred Assistant</Text>
        <Text style={styles.subtitle}>
          Asistente de voz impulsado por IA. Habla para comenzar una conversación.
        </Text>
      </View>

      {/* Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>{statusInfo.label}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
          <Text style={styles.statusText}>{statusInfo.text}</Text>
        </View>
      </View>

      {/* Microphone Button */}
      <View style={styles.micContainer}>
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        >
          <Pressable
            style={[
              styles.micButton,
              isConnected && !isMicMuted && styles.micButtonActive,
            ]}
            onPress={handleMicPress}
            disabled={status === "connecting"}
          >
            <Text style={styles.micText}>🎤</Text>
          </Pressable>
        </Animated.View>

        {isConnected && (
          <Pressable style={styles.cancelButton} onPress={handleCancelRecording}>
            <Text style={styles.cancelButtonText}>Cancelar grabación</Text>
          </Pressable>
        )}

        <View style={styles.instructionContainer}>
          <Text style={styles.instruction}>
            {isStarting || status === "connecting"
              ? "Conectando..."
              : isConnected && !isMicMuted
                ? "Micrófono activo"
                : isConnected
                  ? "Micrófono silenciado"
                  : "Toca el micrófono para iniciar"}
          </Text>
          <Text style={styles.hint}>
            {isConnected
              ? "Toca el micrófono para silenciar/activar o usa cancelar para cortar la sesión"
              : "La sesión solo inicia cuando presionas el micrófono"}
          </Text>
        </View>
      </View>
    </View>
  );
};
