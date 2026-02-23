import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, Animated, Easing } from "react-native";
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
  const rotation1 = useRef(new Animated.Value(0)).current;
  const rotation2 = useRef(new Animated.Value(0)).current;
  const rotation3 = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const borderGlow = useRef(new Animated.Value(0)).current;

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

  // Animaciones del loader cuando está escuchando
  useEffect(() => {
    if (isConnected && !isMicMuted) {
      Animated.loop(
        Animated.timing(rotation1, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();

      Animated.loop(
        Animated.timing(rotation2, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();

      Animated.loop(
        Animated.timing(rotation3, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotation1.setValue(0);
      rotation2.setValue(0);
      rotation3.setValue(0);
    }
  }, [isConnected, isMicMuted]);

  // Animación de borde brillante cuando está desconectado
  useEffect(() => {
    if (!isConnected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(borderGlow, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(borderGlow, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
      ).start();
    } else {
      borderGlow.setValue(0);
    }
  }, [isConnected]);

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

  const spin1 = rotation1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spin2 = rotation2.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  const spin3 = rotation3.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const borderGlowOpacity = borderGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const borderGlowWidth = borderGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 4],
  });

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
        {isConnected && !isMicMuted ? (
          <View style={styles.loaderContainer}>
            {/* Anillo exterior */}
            <Animated.View
              style={[
                styles.loaderRing,
                styles.ring1,
                { transform: [{ rotate: spin1 }] },
              ]}
            />
            {/* Anillo medio */}
            <Animated.View
              style={[
                styles.loaderRing,
                styles.ring2,
                { transform: [{ rotate: spin2 }] },
              ]}
            />
            {/* Anillo interior */}
            <Animated.View
              style={[
                styles.loaderRing,
                styles.ring3,
                { transform: [{ rotate: spin3 }] },
              ]}
            />
            {/* Botón central */}
            <Pressable
              style={styles.centerButton}
              onPress={handleMicPress}
              disabled={status === "connecting"}
            >
              <Text style={styles.micText}>🎤</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.glowButtonContainer}>
            {/* Borde superior */}
            <Animated.View
              style={[
                styles.glowBorderHorizontal,
                styles.glowBorderTop,
                {
                  opacity: borderGlowOpacity,
                  height: borderGlowWidth,
                },
              ]}
            />
            {/* Borde inferior */}
            <Animated.View
              style={[
                styles.glowBorderHorizontal,
                styles.glowBorderBottom,
                {
                  opacity: borderGlowOpacity,
                  height: borderGlowWidth,
                },
              ]}
            />
            {/* Borde izquierdo */}
            <Animated.View
              style={[
                styles.glowBorderVertical,
                styles.glowBorderLeft,
                {
                  opacity: borderGlowOpacity,
                  width: borderGlowWidth,
                },
              ]}
            />
            {/* Borde derecho */}
            <Animated.View
              style={[
                styles.glowBorderVertical,
                styles.glowBorderRight,
                {
                  opacity: borderGlowOpacity,
                  width: borderGlowWidth,
                },
              ]}
            />
            {/* Botón principal */}
            <Animated.View
              style={{
                transform: [{ scale: pulseAnim }],
              }}
            >
              <Pressable
                style={styles.micButtonGlow}
                onPress={handleMicPress}
                disabled={status === "connecting"}
              >
                <Text style={styles.neonButtonText}>HABLAR</Text>
              </Pressable>
            </Animated.View>
          </View>
        )}

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
