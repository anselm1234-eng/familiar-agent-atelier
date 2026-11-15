import { EdgeData } from '../../types/node';
export function createEdge(from: string, to: string): EdgeData {
  return { id: `e_${Date.now()}`, from, to };
}
