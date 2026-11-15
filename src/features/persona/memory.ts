export interface MemoryConfig {
  type: 'session' | 'lifelong';
  maxTokens: number;
}
export const defaultMemory: MemoryConfig = { type: 'session', maxTokens: 4000 };
