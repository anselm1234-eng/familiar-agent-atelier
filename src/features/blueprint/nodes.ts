import { NodeData } from '../../types/node';
export function createNode(type: 'trigger' | 'action' | 'guardrail', x: number, y: number): NodeData {
  return { id: `n_${Date.now()}`, type, title: 'New Node', desc: 'Configure me...', x, y };
}
