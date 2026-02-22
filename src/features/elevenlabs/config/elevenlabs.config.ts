import Constants from "expo-constants";

export interface ElevenLabsConfig {
  agentId?: string;
  overrideConfig?: {
    agent?: {
      prompt?: {
        top_p?: number;
        temperature?: number;
        max_tokens?: number;
      };
    };
  };
}

const PLACEHOLDER_AGENT_ID = "YOUR_AGENT_ID_HERE";

export const getElevenLabsConfig = (): ElevenLabsConfig => {
  const configFromAppJson = Constants.expoConfig?.extra?.elevenlabs as
    | {
        agent_id?: string;
        override_config?: ElevenLabsConfig["overrideConfig"];
      }
    | undefined;

  const agentIdFromEnv = process.env.EXPO_PUBLIC_ELEVENLABS_AGENT_ID;
  const agentId = (agentIdFromEnv ?? configFromAppJson?.agent_id)?.trim();

  return {
    agentId,
    overrideConfig: configFromAppJson?.override_config,
  };
};

export const hasValidAgentId = (agentId?: string): boolean => {
  return Boolean(agentId && agentId.length > 0 && agentId !== PLACEHOLDER_AGENT_ID);
};
