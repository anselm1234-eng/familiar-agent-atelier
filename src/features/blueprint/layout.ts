// Basic auto-layout algorithm (grid based)
export function autoLayout(nodes: any[]): any[] {
  return nodes.map((node, index) => ({
    ...node,
    x: 100 + (index % 3) * 250,
    y: 100 + Math.floor(index / 3) * 150
  }));
}
