/**
 * Componente de estado/badge para mostrar estado de conexión/escucha
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../../shared/utils/constants";

interface StatusBadgeProps {
  label: string;
  status: "online" | "listening" | "processing" | "error";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, status }) => {
  const statusColors: Record<string, string> = {
    online: COLORS.success,
    listening: COLORS.primary,
    processing: COLORS.warning,
    error: COLORS.error,
  };

  const color = statusColors[status];

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
