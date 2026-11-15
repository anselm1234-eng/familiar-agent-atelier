export interface Tool {
  id: string; name: string; category: string; risk: 'low' | 'medium' | 'high';
  requiresAuth: boolean; scopes: string[];
}
export const toolCatalog: Tool[] = [
  { id: 'gmail-read', name: 'Read Emails', category: 'Email', risk: 'low', requiresAuth: true, scopes: ['gmail.readonly'] },
  { id: 'gmail-send', name: 'Send Emails', category: 'Email', risk: 'high', requiresAuth: true, scopes: ['gmail.send'] },
  { id: 'cal-read', name: 'Read Calendar', category: 'Calendar', risk: 'low', requiresAuth: true, scopes: ['calendar.readonly'] }
];
