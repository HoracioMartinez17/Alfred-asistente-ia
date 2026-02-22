/**
 * Servicio LLM (Large Language Model)
 * Encapsula llamadas a APIs de IA (LLaMA, OpenAI, Claude, etc.)
 */

export interface LLMRequest {
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface LLMResponse {
  content: string;
  tokensUsed?: number;
  finishReason?: string;
}

/**
 * Servicio de LLM placeholder
 * En producción, integraría con APIs reales (Ollama local, OpenAI Cloud, etc.)
 */
export class LLMService {
  private model: string = "local-llama2"; // o 'gpt-4', 'claude-3', etc.

  async chat(
    messages: LLMRequest["messages"],
    options?: Omit<LLMRequest, "messages">,
  ): Promise<string> {
    try {
      console.log(`[LLMService] Enviando ${messages.length} mensajes al modelo...`);

      // TODO: Integrar con API real
      // const response = await fetch('http://localhost:11434/api/chat', {
      //   method: 'POST',
      //   body: JSON.stringify({ model: this.model, messages }),
      // });

      // Respuesta placeholder
      return "Hola, soy Alfred. ¿Cómo puedo ayudarte? (Esta es una respuesta de prueba)";
    } catch (error) {
      throw new Error(`Error en solicitud LLM: ${error}`);
    }
  }

  setModel(model: string): void {
    this.model = model;
  }
}

export const llmService = new LLMService();
