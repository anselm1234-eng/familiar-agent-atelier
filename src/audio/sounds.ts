import { playTone } from './engine';

export const sounds = {
  click: () => playTone(600, 'sine', 0.08),
  connect: () => { playTone(500, 'sine', 0.1); setTimeout(() => playTone(750, 'sine', 0.15), 50); },
  guardrail: () => playTone(300, 'triangle', 0.2),
  error: () => { playTone(400, 'square', 0.1, 0.05); setTimeout(() => playTone(300, 'square', 0.15, 0.05), 100); },
  success: () => { playTone(440, 'sine', 0.1); setTimeout(() => playTone(554, 'sine', 0.1), 100); setTimeout(() => playTone(659, 'sine', 0.2), 200); }
};
