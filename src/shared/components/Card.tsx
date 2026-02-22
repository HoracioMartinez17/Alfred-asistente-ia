/**
 * Componente Card - Wrapper visual reutilizable
 *
 * Propósito: Proporcionar un contenedor con estilo consistente para agrupar contenido
 * Uso: <Card><Text>Contenido</Text></Card>
 */
import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS } from "../utils/constants";

/**
 * Props del componente Card
 */
interface CardProps {
  /** Contenido a renderizar dentro de la tarjeta */
  children: ReactNode;
  /** Estilos personalizados (se mezclan con los estilos base) */
  style?: ViewStyle | ViewStyle[];
  /** Padding interno de la tarjeta */
  padding?: number;
  /** Variante de estilo (opcional para futuras extensiones) */
  variant?: "default" | "elevated" | "outlined";
}

/**
 * Componente Card - Contenedor visual con estilos consistentes
 *
 * @param {CardProps} props - Propiedades del componente
 * @returns {React.ReactElement} Componente Card renderizado
 *
 * @example
 * ```tsx
 * <Card padding={16}>
 *   <Text>Contenido de la tarjeta</Text>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<View, CardProps>(
  ({ children, style, padding = SPACING.md, variant = "default" }, ref) => {
    return (
      <View ref={ref} style={[styles.container, styles[variant], { padding }, style]}>
        {children}
      </View>
    );
  },
);

Card.displayName = "Card";

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
  },

  default: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },

  elevated: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  outlined: {
    backgroundColor: "transparent",
    borderColor: COLORS.primary,
  },
});
