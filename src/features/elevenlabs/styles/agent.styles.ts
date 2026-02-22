import { StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS } from "@/shared/utils/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },

  // Sección de encabezado
  headerContainer: {
    width: "100%",
    marginBottom: SPACING.lg,
  },

  title: {
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 15,
    color: COLORS.text.secondary,
    lineHeight: 24,
    fontWeight: "400",
  },

  // Sección de estado
  statusContainer: {
    width: "100%",
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: SPACING.lg,
  },

  statusLabel: {
    fontSize: 11,
    color: COLORS.text.muted,
    marginBottom: SPACING.xs,
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  statusText: {
    fontSize: 15,
    color: COLORS.text.primary,
    fontWeight: "500",
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Botón de micrófono
  micContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SPACING.xl,
    width: "100%",
  },

  micButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
    marginVertical: SPACING.lg,
  },

  micButtonActive: {
    backgroundColor: "#FF5555",
    shadowColor: "#FF5555",
    shadowOpacity: 0.3,
  },

  micText: {
    fontSize: 64,
  },

  cancelButton: {
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: "#FF5555",
    backgroundColor: "rgba(255, 85, 85, 0.1)",
  },

  cancelButtonText: {
    color: "#FF5555",
    fontSize: 13,
    fontWeight: "600",
  },

  // Instrucciones
  instructionContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: SPACING.md,
  },

  instruction: {
    fontSize: 17,
    color: COLORS.text.primary,
    fontWeight: "500",
    marginTop: SPACING.md,
  },

  hint: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: SPACING.sm,
    fontWeight: "400",
  },

  // Historial de mensajes
  messageHistoryContainer: {
    width: "100%",
    maxHeight: "30%",
    marginVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },

  messageBubble: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    marginVertical: SPACING.sm,
    maxWidth: "85%",
  },

  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primary,
  },

  agentMessage: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  messageBubbleText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.text.primary,
  },

  userMessageText: {
    color: "#FFFFFF",
  },

  // Estado de error
  errorContainer: {
    width: "100%",
    padding: SPACING.md,
    backgroundColor: "rgba(255, 85, 85, 0.05)",
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 85, 85, 0.2)",
  },

  errorText: {
    color: "#FF5555",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },

  // Estado de carga
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: COLORS.primary,
  },
});
