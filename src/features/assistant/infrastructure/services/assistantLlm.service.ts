import { llmService } from "@/shared/services/llmService";

type AssistantLlmMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export const assistantLlmService = {
  chat: (messages: AssistantLlmMessage[]) => {
    return llmService.chat(messages);
  },
};
