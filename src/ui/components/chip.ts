export function createChip(text: string, type: 'trigger' | 'action' | 'guardrail'): HTMLElement {
  const chip = document.createElement('span');
  chip.innerText = text;
  chip.style.padding = '4px 8px';
  chip.style.borderRadius = '12px';
  chip.style.fontSize = '12px';
  chip.style.fontWeight = '600';
  chip.style.display = 'inline-block';

  if (type === 'trigger') { chip.style.background = 'var(--peach)'; chip.style.color = 'var(--ink)'; }
  if (type === 'action') { chip.style.background = 'var(--sage)'; chip.style.color = 'var(--ink)'; }
  if (type === 'guardrail') { chip.style.background = 'var(--lavender)'; chip.style.color = 'var(--ink)'; }

  return chip;
}
