// Simple Pub/Sub for cross-component communication
type EventCallback = (data?: any) => void;
const events: Record<string, EventCallback[]> = {};

export const eventBus = {
  on(event: string, callback: EventCallback) {
    if (!events[event]) events[event] = [];
    events[event].push(callback);
  },
  emit(event: string, data?: any) {
    if (events[event]) {
      events[event].forEach(cb => cb(data));
    }
  }
};
