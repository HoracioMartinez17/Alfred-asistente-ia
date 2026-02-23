/**
 * Botón de voz para iniciar grabación
 */
import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
} from "react-native";
import { COLORS, SPACING, BORDER_RADIUS } from "../../../shared/utils/constants";

interface VoiceButtonProps {
  isListening: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  isListening,
  onPress,
  disabled = false,
  style,
}) => {
  const size = 100;
  const rotation1 = useRef(new Animated.Value(0)).current;
  const rotation2 = useRef(new Animated.Value(0)).current;
  const rotation3 = useRef(new Animated.Value(0)).current;
  const hueRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isListening) {
      // Animación de rotación principal
      Animated.loop(
        Animated.timing(rotation1, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();

      // Animación de rotación inversa
      Animated.loop(
        Animated.timing(rotation2, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();

      // Animación de rotación con delay
      Animated.loop(
        Animated.timing(rotation3, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();

      // Animación de colores (simulada con opacidad)
      Animated.loop(
        Animated.timing(hueRotate, {
          toValue: 1,
          duration: 6000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotation1.setValue(0);
      rotation2.setValue(0);
      rotation3.setValue(0);
      hueRotate.setValue(0);
    }
  }, [isListening]);

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

  return (
    <View style={[styles.container, style]}>
      {isListening ? (
        <View style={styles.loaderContainer}>
          {/* Círculo exterior animado */}
          <Animated.View
            style={[styles.loaderRing, styles.ring1, { transform: [{ rotate: spin1 }] }]}
          />

          {/* Círculo medio animado */}
          <Animated.View
            style={[styles.loaderRing, styles.ring2, { transform: [{ rotate: spin2 }] }]}
          />

          {/* Círculo interior animado */}
          <Animated.View
            style={[styles.loaderRing, styles.ring3, { transform: [{ rotate: spin3 }] }]}
          />

          {/* Centro con micrófono */}
          <TouchableOpacity
            style={styles.centerButton}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
          >
            <Text style={styles.icon}>🎤</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            {
              width: size,
              height: size,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.8}
        >
          <Text style={styles.icon}>🎤</Text>
        </TouchableOpacity>
      )}

      {isListening && <Text style={styles.label}>Escuchando...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.lg,
  },
  loaderContainer: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  loaderRing: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 3,
  },
  ring1: {
    width: 120,
    height: 120,
    borderColor: "#ffbf48",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
  },
  ring2: {
    width: 90,
    height: 90,
    borderColor: "#be4a1d",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
  },
  ring3: {
    width: 60,
    height: 60,
    borderColor: "#ffbf4880",
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
  },
  centerButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#ffbf48",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    fontSize: 28,
  },
  label: {
    color: COLORS.success,
    marginTop: SPACING.md,
    fontWeight: "600",
  },
});
