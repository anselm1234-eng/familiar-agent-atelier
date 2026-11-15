export type SimEventType = 'trigger' | 'action' | 'guardrail' | 'error';
export interface TimelineEvent {
  id: string;
  time: string;
  type: SimEventType;
  description: string;
}
