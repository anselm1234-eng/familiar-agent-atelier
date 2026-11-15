export function parseCron(cron: string): string {
  // Very basic human-readable cron parser
  if (cron === '0 8 * * *') return 'Every day at 8:00 AM';
  if (cron === '0 9 * * 1-5') return 'Weekdays at 9:00 AM';
  return 'Custom schedule';
}
