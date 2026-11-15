import skillData from '../data/skill-nodes.json';
import { showToast } from '../ui/toast';
import { sounds } from '../audio/sounds';

export function renderSkillTree(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px';
  container.style.height = '100%';
  container.style.overflowY = 'auto';

  let unlocked: string[] = ['email-read', 'cal-read', 'web-search'];

  const render = () => {
    const boughs: Record<string, any[]> = {};
    skillData.forEach((node: any) => {
      if (!boughs[node.category]) boughs[node.category] = [];
      boughs[node.category].push(node);
    });

    container.innerHTML = `
      <header style="margin-bottom: 40px;">
        <h1 class="font-serif" style="margin: 0; font-size: 48px;">Skill Tree</h1>
        <p style="margin: 4px 0 0 0; color: var(--text-secondary); font-size: 16px;">Unlock nodes to expand your agent's abilities.</p>
      </header>
      
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        ${Object.entries(boughs).map(([category, nodes]) => `
          <div style="flex: 1; min-width: 280px; background: var(--bg-surface); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
            <h2 class="font-serif" style="font-size: 24px; margin-bottom: 24px; color: var(--text-primary);">${category}</h2>
            <div style="display: flex; flex-direction: column; gap: 12px; position: relative;">
              ${nodes.map(node => {
                const isUnlocked = unlocked.includes(node.id);
                const canUnlock = node.requires.every((req: string) => unlocked.includes(req));
                
                return `
                  <div class="skill-node" data-id="${node.id}" data-can-unlock="${canUnlock}" data-unlocked="${isUnlocked}" style="
                    background: ${isUnlocked ? 'var(--accent-sage)' : canUnlock ? 'var(--bg-surface)' : 'var(--bg-hover)'};
                    color: ${isUnlocked ? 'var(--text-on-accent)' : canUnlock ? 'var(--text-primary)' : 'var(--text-tertiary)'};
                    padding: 16px;
                    border-radius: var(--radius-md);
                    border: 2px solid ${isUnlocked ? 'transparent' : canUnlock ? 'var(--text-primary)' : 'transparent'};
                    cursor: ${canUnlock && !isUnlocked ? 'pointer' : 'default'};
                    box-shadow: ${canUnlock && !isUnlocked ? 'var(--shadow-md)' : 'none'};
                    transition: all 0.2s;
                  ">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <strong style="font-size: 15px;">${node.label}</strong>
                      ${isUnlocked ? '<span>✓</span>' : canUnlock ? '<span>+</span>' : '<span>🔒</span>'}
                    </div>
                    <p style="margin: 8px 0 0 0; font-size: 13px; opacity: 0.8;">${node.desc}</p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.skill-node').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id')!;
        const canUnlock = el.getAttribute('data-can-unlock') === 'true';
        const isUnlocked = el.getAttribute('data-unlocked') === 'true';

        if (canUnlock && !isUnlocked) {
          unlocked.push(id);
          sounds.success();
          showToast('Capability Unlocked!', 'success');
          render(); 
        }
      });
    });
  };

  render();
  return container;
}
