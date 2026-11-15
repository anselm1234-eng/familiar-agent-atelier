import { skillData } from './nodes';
export function getUnlockedSkills(completed: string[]): string[] {
  return skillData.filter(skill => 
    skill.requires.every(req => completed.includes(req))
  ).map(s => s.id);
}
