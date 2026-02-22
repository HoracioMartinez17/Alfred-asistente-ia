/**
 * Botón de voz para iniciar grabación
 */
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
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
  const size = 70;
  const pulseSize = isListening ? 110 : size;

  return (
    <View style={[styles.container, style]}>
      {isListening && <View style={[styles.pulse]} />}

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
  pulse: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: `${COLORS.primary}20`,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  icon: {
    fontSize: 32,
  },
  label: {
    color: COLORS.success,
    marginTop: SPACING.md,
    fontWeight: "600",
  },
});
