export function calculateCoverage(totalActions: number, guardedActions: number): number {
  if (totalActions === 0) return 100;
  return Math.round((guardedActions / totalActions) * 100);
}
