import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS } from "@/shared/utils/constants";

export const AgentScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Alfred Assistant</Text>
        <Text style={styles.text}>
          La conversación por voz con ElevenLabs está disponible en iOS y Android.
        </Text>
        <Text style={styles.hint}>
          En web puedes usar la pantalla de asistente de texto o ejecutar en un
          dispositivo móvil.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  card: {
    width: "100%",
    maxWidth: 560,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  title: {
    color: COLORS.text.primary,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: SPACING.sm,
  },
  text: {
    color: COLORS.text.secondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: SPACING.sm,
  },
  hint: {
    color: COLORS.text.muted,
    fontSize: 13,
    lineHeight: 20,
  },
});
