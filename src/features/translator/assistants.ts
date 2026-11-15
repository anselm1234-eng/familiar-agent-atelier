export function exportAssistants(nodes: any[], edges: any[]): string {
  return `// OpenAI Assistants Export\nconst assistant = await openai.beta.assistants.create({\n  name: "My Agent",\n  tools: []\n});`;
}
