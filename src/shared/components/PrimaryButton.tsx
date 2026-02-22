/**
 * Botón primario reutilizable
 */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS, SPACING, BORDER_RADIUS } from "../utils/constants";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "medium",
  style,
}) => {
  const isPrimary = variant === "primary";
  const isDisabled = disabled || loading;

  const sizeStyles: Record<string, { paddingVertical: number }> = {
    small: { paddingVertical: SPACING.sm },
    medium: { paddingVertical: SPACING.md },
    large: { paddingVertical: SPACING.lg },
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: isPrimary ? COLORS.primary : "transparent",
    borderRadius: BORDER_RADIUS.md,
    borderWidth: !isPrimary ? 1 : 0,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    opacity: isDisabled ? 0.6 : 1,
    ...sizeStyles[size],
  };

  const textStyle: TextStyle = {
    color: isPrimary ? "#FFFFFF" : COLORS.text.secondary,
    fontWeight: "600",
    fontSize: 15,
  };

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{loading ? "..." : label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // estilos internos si los necesitas
});
