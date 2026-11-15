export interface SimEvent {
  time: string; // e.g., "08:00"
  hour: number; // 0-24 for the slider
  title: string;
  desc: string;
  type: 'trigger' | 'action' | 'guardrail';
}

export const mockDay: SimEvent[] = [
  { time: '08:00', hour: 8, title: 'Morning Cron', desc: 'Agent wakes up and starts the morning brief.', type: 'trigger' },
  { time: '08:05', hour: 8.1, title: 'Fetch Calendar', desc: 'Reads 3 meetings for today.', type: 'action' },
  { time: '08:10', hour: 8.2, title: 'Human Check', desc: 'Waits for your approval to send the brief.', type: 'guardrail' },
  { time: '12:30', hour: 12.5, title: 'Inbox Triage', desc: 'Sorts 45 emails. Drafts 2 replies.', type: 'action' },
  { time: '18:00', hour: 18, title: 'End of Day', desc: 'Generates a summary of completed tasks.', type: 'action' }
];
