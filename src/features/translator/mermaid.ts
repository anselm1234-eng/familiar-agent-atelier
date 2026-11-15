export function exportMermaid(nodes: any[], edges: any[]): string {
  let mermaid = 'graph TD\n';
  edges.forEach(e => { mermaid += `  ${e.from} --> ${e.to}\n`; });
  return mermaid;
}
