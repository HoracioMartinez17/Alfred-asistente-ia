/**
 * Tarjeta de respuesta del asistente
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS } from "../../../shared/utils/constants";

interface ResponseCardProps {
  role: "user" | "assistant";
  content: string;
}

export const ResponseCard: React.FC<ResponseCardProps> = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <View style={[styles.container, isUser && styles.userAlign]}>
      <View style={[styles.card, isUser ? styles.userCard : styles.assistantCard]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.assistantText]}>
          {content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginVertical: SPACING.sm,
  },
  userAlign: {
    alignItems: "flex-end",
  },
  card: {
    maxWidth: "85%",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
  },
  userCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  assistantCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  text: {
    lineHeight: 20,
  },
  userText: {
    color: "#FFFFFF",
  },
  assistantText: {
    color: COLORS.text.primary,
  },
});
