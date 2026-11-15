import { Genome } from '../genome';
export function generateSystemPrompt(genome: Genome, name: string): string {
  const tone = genome.tone > 5 ? 'warm and conversational' : 'direct and dry';
  const autonomy = genome.autonomy > 7 ? 'act without asking for permission unless it involves money' : 'ask for confirmation before taking any action';
  
  return `You are ${name}, a personal AI agent.
Your tone should be ${tone}.
You must ${autonomy}.
You have access to the tools provided in your blueprint.`;
}
