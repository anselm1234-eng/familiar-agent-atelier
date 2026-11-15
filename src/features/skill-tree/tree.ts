import { skillData, SkillNode } from './nodes';
export function buildTree(): Record<string, SkillNode[]> {
  // Groups skills by category/bough for the UI
  const tree: Record<string, SkillNode[]> = {
    'Inbox': skillData.filter(s => s.id.includes('email')),
    'Calendar': []
  };
  return tree;
}
