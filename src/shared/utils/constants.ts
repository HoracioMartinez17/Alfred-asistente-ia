/**
 * Constantes y configuración global
 */

export const APP_NAME = "Alfred // IA Assistant";
export const APP_VERSION = "1.0.0";

export const COLORS = {
  primary: "#0070F3", // Azul Vercel
  success: "#34D399",
  error: "#FF5555",
  warning: "#FFA500",

  // Tema oscuro (Vercel-style)
  dark: {
    background: "#0A0E27", // Negro ultra profundo
    surface: "#131829", // Superficie sutil
    surfaceAlt: "#1A202C", // Superficie alternativa
    border: "#363B50", // Borde sutil
    text: "#FFFFFF",
    textSecondary: "#C0C0C0",
    textMuted: "#808080",
  },

  // Alias de nivel superior
  surface: "#131829",
  border: "#363B50",
  bg: "#0A0E27",
  text: {
    primary: "#FFFFFF",
    secondary: "#C0C0C0",
    muted: "#808080",
  },
  accent: "#5B9CF5",
} as const;

export const BORDER_RADIUS = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
} as const;

export const SPACING = {
  xs: 6,
  sm: 12,
  md: 20,
  lg: 32,
  xl: 48,
} as const;

export const TIMEOUTS = {
  debounce: 300,
  errorDismiss: 3000,
  shortAnimation: 200,
  mediumAnimation: 500,
} as const;
