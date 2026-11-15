import { sounds } from '../audio/sounds';

export function renderRituals(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px'; container.style.maxWidth = '800px'; container.style.margin = '0 auto';
  
  container.innerHTML = `
    <header style="margin-bottom: 40px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Rituals</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Daily habits to train your familiar.</p>
    </header>
    <div id="ritual-list" style="display: flex; flex-direction: column; gap: 16px;"></div>
  `;

  const list = container.querySelector('#ritual-list')!;
  const rituals = [
    { id: 'r1', label: 'Review one guardrail', streak: 3, days: [1,1,1,1,0,0,0] },
    { id: 'r2', label: 'Simulate a boring day', streak: 1, days: [0,0,1,0,0,0,0] },
    { id: 'r3', label: 'Add one fallback', streak: 0, days: [0,0,0,0,0,0,0] }
  ];

  rituals.forEach((r, i) => {
    const card = document.createElement('div');
    card.style.background = 'var(--bg-surface)';
    card.style.padding = '20px';
    card.style.borderRadius = 'var(--radius-md)';
    card.style.border = '1px solid var(--border-subtle)';
    card.style.boxShadow = 'var(--shadow-sm)';
    card.style.display = 'flex';
    card.style.justifyContent = 'space-between';
    card.style.alignItems = 'flex-start'; // Align to top so checkmark stays put if text wraps
    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.2s';
    card.style.animation = `slide-up 0.5s ease-out backwards`;
    card.style.animationDelay = `${0.2 + (i * 0.1)}s`;
    
    const weekHTML = r.days.map(d => `
      <div style="width: 12px; height: 12px; border-radius: 50%; background: ${d ? 'var(--accent-sage)' : 'var(--bg-hover)'}; border: 1px solid var(--border-subtle);"></div>
    `).join('');

    card.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 16px; flex: 1;">
        <div class="ritual-check" style="width: 28px; height: 28px; min-width: 28px; flex-shrink: 0; border-radius: 50%; border: 2px solid var(--text-primary); display: flex; justify-content: center; align-items: center; font-weight: bold; color: var(--text-primary); transition: all 0.2s;">✓</div>
        <div style="flex: 1; padding-right: 16px;">
          <div class="ritual-text" style="font-weight: 600; font-size: 16px; color: var(--text-primary); margin-bottom: 8px; line-height: 1.4;">${r.label}</div>
          <div style="display: flex; gap: 6px;">${weekHTML}</div>
        </div>
      </div>
      <span style="font-size: 16px; font-weight: 700; color: var(--accent-clay); flex-shrink: 0;">🔥 ${r.streak}</span>
    `;

    // Make the WHOLE card clickable instead of just the small circle
    card.addEventListener('click', () => {
      sounds.success();
      const check = card.querySelector('.ritual-check') as HTMLElement;
      const text = card.querySelector('.ritual-text') as HTMLElement;
      const isCompleted = card.classList.contains('completed');

      if (!isCompleted) {
        card.classList.add('completed');
        card.style.background = 'var(--accent-sage)';
        card.style.borderColor = 'transparent';
        check.style.background = 'var(--text-primary)';
        check.style.color = 'var(--bg-surface)';
        text.style.color = 'var(--text-primary)';
      } else {
        card.classList.remove('completed');
        card.style.background = 'var(--bg-surface)';
        card.style.borderColor = 'var(--border-subtle)';
        check.style.background = 'transparent';
        check.style.color = 'var(--text-primary)';
      }
    });

    list.appendChild(card);
  });

  return container;
}
