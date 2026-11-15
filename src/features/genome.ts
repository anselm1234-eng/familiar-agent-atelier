export type Genome = { tone: number; verbosity: number; proactivity: number; autonomy: number; risk: number; memory: number; rigor: number; playfulness: number; };
export const defaultGenome: Genome = { tone: 5, verbosity: 5, proactivity: 5, autonomy: 5, risk: 5, memory: 5, rigor: 5, playfulness: 5 };
export const traitLabels = {
  tone: ['Dry', 'Warm'], verbosity: ['Terse', 'Verbose'], proactivity: ['Reactive', 'Initiates'], autonomy: ['Asks', 'Acts'],
  risk: ['Cautious', 'Bold'], memory: ['Session', 'Lifelong'], rigor: ['Fast', 'Double-checks'], playfulness: ['Serious', 'Playful']
};
export function getFingerprint(genome: Genome): string {
  const words = ['SAGE', 'PEACH', 'LAV', 'CLAY', 'BONE', 'INK'];
  const sum = Object.values(genome).reduce((a, b) => a + b, 0);
  return `${words[sum % words.length]}-${sum % 10}${String.fromCharCode(65 + (sum % 26))}`;
}
