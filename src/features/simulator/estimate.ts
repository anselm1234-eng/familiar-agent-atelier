export function estimateCost(tokensPerDay: number, days: number = 30): number {
  const pricePerMillion = 0.50; // Mock price
  return ((tokensPerDay * days) / 1000000) * pricePerMillion;
}
