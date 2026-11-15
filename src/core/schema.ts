import { Agent } from '../types/agent';

// Validates if an object is a proper Agent before saving to DB
export function validateAgent(agent: any): agent is Agent {
  if (!agent || typeof agent !== 'object') return false;
  if (typeof agent.id !== 'string' || agent.id.length === 0) return false;
  if (typeof agent.name !== 'string') return false;
  if (!Array.isArray(agent.nodes) || !Array.isArray(agent.edges)) return false;
  if (!agent.genome || typeof agent.genome !== 'object') return false;
  return true;
}

// Checks if a node has valid coordinates and IDs
export function validateNode(node: any): boolean {
  return (
    typeof node.id === 'string' &&
    typeof node.x === 'number' &&
    typeof node.y === 'number' &&
    typeof node.type === 'string'
  );
}
