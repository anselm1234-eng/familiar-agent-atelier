export interface SkillNode {
  id: string; label: string; requires: string[];
}
export const skillData: SkillNode[] = [
  { id: 'read-email', label: 'Read Email', requires: [] },
  { id: 'triage', label: 'Triage Inbox', requires: ['read-email'] },
  { id: 'send-email', label: 'Send Email', requires: ['triage'] }
];
