export function getAgentMood(completionRate: number): string {
  if (completionRate > 80) return 'Thriving';
  if (completionRate > 50) return 'Steady';
  if (completionRate > 20) return 'Curious';
  return 'Overgrown';
}
