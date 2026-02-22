/**
 * Tema centralizado para la app
 */
import { StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS } from "./constants";

export const createTheme = () => ({
  colors: COLORS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  typography: {
    h1: { fontSize: 34, fontWeight: "700" as const },
    h2: { fontSize: 24, fontWeight: "600" as const },
    body: { fontSize: 15, fontWeight: "400" as const },
    small: { fontSize: 12, fontWeight: "400" as const },
  },
});

export type Theme = ReturnType<typeof createTheme>;

export const theme = createTheme();

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gap: {
    gap: SPACING.md,
  },
});
