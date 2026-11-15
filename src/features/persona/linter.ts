import { Genome } from '../genome';
export function lintGenome(genome: Genome): string[] {
  const issues: string[] = [];
  if (genome.autonomy > 8 && genome.risk > 8) {
    issues.push("Dangerous combination: High Autonomy + High Risk. Add guardrails.");
  }
  return issues;
}
