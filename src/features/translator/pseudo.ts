export function exportPseudo(nodes: any[], edges: any[]): string {
  let script = "AGENT WORKFLOW:\n";
  nodes.forEach(n => { script += `- Execute: ${n.title}\n`; });
  return script;
}
