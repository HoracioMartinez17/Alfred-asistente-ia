import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS } from "@/shared/utils/constants";

export const IntegrationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integraciones</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📧 Gmail</Text>
          <Text style={styles.cardDescription}>
            Próximamente: Acceso a correos y gestión de bandeja de entrada
          </Text>
          <Text style={styles.status}>Configurando...</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📅 Google Calendar</Text>
          <Text style={styles.cardDescription}>
            Próximamente: Crear eventos, ver disponibilidad y recordatorios
          </Text>
          <Text style={styles.status}>Configurando...</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>✓ Contactos</Text>
          <Text style={styles.cardDescription}>
            Acceso a tus contactos para búsquedas rápidas
          </Text>
          <Text style={styles.status}>Disponible</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚙️ Configuración</Text>
          <Text style={styles.cardDescription}>
            Personaliza voces, idioma y preferencias del asistente
          </Text>
          <Text style={styles.status}>Próximamente</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
    marginTop: SPACING.lg,
  },

  content: {
    flex: 1,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },

  cardDescription: {
    fontSize: 13,
    color: COLORS.text.secondary,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },

  status: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "500",
    marginTop: SPACING.sm,
  },
});
