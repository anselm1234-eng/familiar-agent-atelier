export function validateGraph(nodes: any[], edges: any[]): string[] {
  const warnings: string[] = [];
  if (nodes.length === 0) warnings.push("Graph is empty.");
  const triggers = nodes.filter(n => n.type === 'trigger');
  if (triggers.length === 0) warnings.push("Missing a Trigger node. Agent won't know when to wake up.");
  return warnings;
}
