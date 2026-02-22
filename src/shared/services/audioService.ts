/**
 * Servicio de Audio
 * Encapsula la lógica de grabación, síntesis de voz y reconocimiento
 */

export interface IAudioService {
  startListening(): Promise<string>;
  stopListening(): Promise<void>;
  speak(text: string, options?: SpeakOptions): Promise<void>;
  isListening(): boolean;
}

export interface SpeakOptions {
  language?: string;
  rate?: number;
  pitch?: number;
}

/**
 * Implementación placeholder del servicio de audio
 * En producción, integraría expo-speech, expo-voice, LiveKit, etc.
 */
export class AudioService implements IAudioService {
  private listening = false;

  async startListening(): Promise<string> {
    try {
      this.listening = true;
      console.log("[AudioService] Iniciando grabación...");
      // TODO: Integrar con expo-voice o LiveKit
      // await VoiceModule.startAsync();
      return "";
    } catch (error) {
      this.listening = false;
      throw new Error(`Error en ASR: ${error}`);
    }
  }

  async stopListening(): Promise<void> {
    try {
      this.listening = false;
      console.log("[AudioService] Deteniendo grabación...");
      // TODO: llamar a stop del módulo
    } catch (error) {
      throw new Error(`Error al detener grabación: ${error}`);
    }
  }

  async speak(text: string, options: SpeakOptions = {}): Promise<void> {
    try {
      const { language = "es-ES", rate = 1, pitch = 1 } = options;
      console.log(`[AudioService] Reproduciendo: "${text.slice(0, 30)}..."`);
      // TODO: Integrar con expo-speech
      // await Speech.speak(text, { language, rate, pitch });
    } catch (error) {
      throw new Error(`Error en TTS: ${error}`);
    }
  }

  isListening(): boolean {
    return this.listening;
  }
}

export const audioService = new AudioService();
