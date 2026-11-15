export interface NodeData { id: string; type: string; title: string; desc: string; x: number; y: number; }
export interface EdgeData { id: string; from: string; to: string; }
export class Graph {
  nodes: NodeData[] = [];
  edges: EdgeData[] = [];
  addNode(node: NodeData) { this.nodes.push(node); }
  addEdge(edge: EdgeData) { this.edges.push(edge); }
}
