export interface Guardrail {
  id: string; type: 'human-check' | 'budget' | 'allow-list'; value: string;
}
export function applyGuardrails(action: string, guardrails: Guardrail[]): boolean {
  // Returns true if action is allowed to proceed automatically
  if (guardrails.some(g => g.type === 'human-check')) return false;
  return true;
}
