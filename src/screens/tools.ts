import tools from '../data/tools.json';
import { sounds } from '../audio/sounds';
import { showToast } from '../ui/toast';
import { store } from '../core/store';

export function renderTools(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px'; container.style.maxWidth = '1000px'; container.style.margin = '0 auto';
  container.innerHTML = `
    <header style="margin-bottom: 40px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Tool Registry</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Connect capabilities and review scopes.</p>
    </header>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;" id="tool-grid"></div>
  `;
  const grid = container.querySelector('#tool-grid')!;
  const activeTools = store.getState().activeTools;

  tools.forEach(tool => {
    const isActive = activeTools.includes(tool.id);
    const card = document.createElement('div');
    card.className = 'bento-card';
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
        <div>
          <h3 class="font-serif" style="font-size: 24px; margin-bottom: 4px;">${tool.name}</h3>
          <span style="font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px; background: ${tool.risk === 'high' ? 'var(--accent-clay)' : tool.risk === 'medium' ? 'var(--accent-peach)' : 'var(--accent-sage)'}; color: #1A1A1A;">${tool.risk.toUpperCase()} RISK</span>
        </div>
        <label class="switch"><input type="checkbox" class="tool-toggle" data-id="${tool.id}" ${isActive ? 'checked' : ''}><span class="slider"></span></label>
      </div>
      <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">${tool.desc}</p>
      <div style="font-size: 12px; font-family: var(--font-mono); background: var(--bg-hover); padding: 8px; border-radius: 4px; color: var(--text-tertiary);">
        Scopes: ${tool.scopes.join(', ')}
      </div>
    `;
    grid.appendChild(card);
  });

  container.querySelectorAll('.tool-toggle').forEach(el => {
    el.addEventListener('change', (e) => {
      sounds.click();
      const isChecked = (e.target as HTMLInputElement).checked;
      const toolId = (e.target as HTMLInputElement).getAttribute('data-id')!;
      let newTools = [...store.getState().activeTools];
      if (isChecked) newTools.push(toolId);
      else newTools = newTools.filter(id => id !== toolId);
      store.setState({ activeTools: newTools });
      showToast(isChecked ? 'Tool connected!' : 'Tool disconnected', 'info');
    });
  });
  return container;
}
