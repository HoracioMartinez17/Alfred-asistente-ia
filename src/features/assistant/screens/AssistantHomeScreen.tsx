/**
 * Pantalla principal del asistente
 * Orquesta componentes, hooks y servicios
 */
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAssistantChat } from "@/features/assistant/application/hooks/useAssistantChat";
import { useVoiceInput } from "@/features/assistant/application/hooks/useVoiceInput";
import { VoiceButton } from "../components/VoiceButton";
import { ResponseCard } from "../components/ResponseCard";
import { StatusBadge } from "../components/StatusBadge";
import { COLORS, SPACING, BORDER_RADIUS } from "../../../shared/utils/constants";

export const AssistantHomeScreen: React.FC = () => {
  const { messages, isProcessing, error, sendMessage, clearMessages } =
    useAssistantChat();
  const { isListening, transcript, startListening, stopListening, reset } =
    useVoiceInput();

  const [textInput, setTextInput] = useState("");

  const handleVoicePress = async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  const handleSendText = () => {
    if (textInput.trim()) {
      sendMessage(textInput);
      setTextInput("");
    }
  };

  useEffect(() => {
    const voiceText = transcript.trim();
    if (!isListening && !isProcessing && voiceText) {
      sendMessage(voiceText);
      reset();
    }
  }, [transcript, isListening, isProcessing, sendMessage, reset]);

  const handleCancelRecording = async () => {
    try {
      await stopListening();
    } finally {
      reset();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Alfred // IA</Text>
          <StatusBadge label="ONLINE" status="online" />
        </View>

        {/* Messages ScrollView */}
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Inicia una conversación</Text>
              <Text style={styles.emptySubtext}>
                Usa el micrófono o escribe tu mensaje
              </Text>
            </View>
          ) : (
            messages.map((msg) => (
              <ResponseCard key={msg.id} role={msg.role} content={msg.content} />
            ))
          )}

          {/* Mostrando transcript de voz */}
          {Boolean(transcript.trim()) && (
            <View style={styles.transcriptBox}>
              <Text style={styles.transcriptLabel}>Capturado:</Text>
              <Text style={styles.transcriptText}>{transcript}</Text>
            </View>
          )}

          {/* Error message */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          {/* Voice Button */}
          <VoiceButton
            isListening={isListening}
            onPress={handleVoicePress}
            disabled={isProcessing}
          />

          {isListening && (
            <TouchableOpacity
              onPress={handleCancelRecording}
              style={styles.cancelRecordingButton}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelRecordingText}>Cancelar grabación</Text>
            </TouchableOpacity>
          )}

          {/* Text Input */}
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Escribe tu mensaje..."
              placeholderTextColor={COLORS.text.muted}
              value={textInput}
              onChangeText={setTextInput}
              editable={!isProcessing}
              multiline
              numberOfLines={3}
              scrollEnabled
            />
            <TouchableOpacity
              onPress={handleSendText}
              disabled={!textInput.trim() || isProcessing}
              style={[styles.sendButton, !textInput.trim() && { opacity: 0.5 }]}
            >
              <Text style={styles.sendIcon}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Clear button */}
          {messages.length > 0 && (
            <TouchableOpacity onPress={clearMessages} style={styles.clearButton}>
              <Text style={styles.clearText}>Limpiar</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.text.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  emptySubtext: {
    color: COLORS.text.muted,
    marginTop: SPACING.sm,
    fontSize: 14,
  },
  transcriptBox: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  transcriptLabel: {
    color: COLORS.text.secondary,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: SPACING.sm,
  },
  transcriptText: {
    color: COLORS.text.primary,
    fontSize: 14,
  },
  errorBox: {
    backgroundColor: `${COLORS.error}20`,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
  },
  inputContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cancelRecordingButton: {
    alignSelf: "center",
    marginTop: -SPACING.sm,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.error,
    backgroundColor: `${COLORS.error}14`,
  },
  cancelRecordingText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: "600",
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.bg,
    color: COLORS.text.primary,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    minHeight: 44,
    maxHeight: 100,
    fontSize: 15,
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  clearButton: {
    marginTop: SPACING.sm,
    paddingVertical: SPACING.sm,
    alignItems: "center",
  },
  clearText: {
    color: COLORS.text.muted,
    fontSize: 12,
    fontWeight: "500",
  },
});
