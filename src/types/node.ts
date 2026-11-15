export interface NodeData {
  id: string;
  type: 'trigger' | 'action' | 'guardrail';
  title: string;
  desc: string;
  x: number;
  y: number;
}

export interface EdgeData {
  id: string;
  from: string;
  to: string;
}
