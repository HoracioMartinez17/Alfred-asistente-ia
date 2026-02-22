import { audioService } from "@/shared/services/audioService";

export const assistantAudioService = {
  startListening: () => audioService.startListening(),
  stopListening: () => audioService.stopListening(),
  speak: (text: string) => audioService.speak(text),
};
