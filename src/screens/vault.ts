import { getAllAgents } from '../core/db';
import { store } from '../core/store';
import { showToast } from '../ui/toast';
import { createGlyph } from '../ui/components/glyph';

export async function renderVault(): Promise<HTMLElement> {
  const container = document.createElement('div');
  container.style.padding = '32px'; container.style.maxWidth = '1200px'; container.style.margin = '0 auto';
  container.innerHTML = `
    <header style="margin-bottom: 40px; animation: slide-up 0.4s ease-out;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Vault</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Your saved agents and blueprints.</p>
    </header>
    <div id="vault-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
      <p style="color: var(--text-secondary);">Loading agents...</p>
    </div>
  `;

  const list = container.querySelector('#vault-list')!;
  
  try {
    const agents = await getAllAgents();
    
    if (agents.length === 0) {
      list.innerHTML = `<p style="color: var(--text-secondary); grid-column: 1 / -1; text-align: center; padding: 40px; animation: slide-up 0.5s ease-out;">No agents saved yet. Go to the Blueprint Canvas and hit "Save to Vault", or Load the Pro Sample on the Hearth!</p>`;
      return container;
    }

    list.innerHTML = '';
    agents.forEach((agent, i) => {
      const card = document.createElement('div');
      card.className = 'bento-card';
      card.style.animation = `slide-up 0.5s ease-out backwards`;
      card.style.animationDelay = `${0.2 + (i * 0.1)}s`;
      card.style.display = 'flex'; card.style.flexDirection = 'row'; card.style.alignItems = 'center'; card.style.gap = '16px';
      
      const fp = agent.fingerprint || 'SAGE-1A';
      const glyph = createGlyph(fp, 56).outerHTML;
      
      card.innerHTML = `
        <div>${glyph}</div>
        <div style="flex: 1;">
          <h3 style="margin: 0 0 4px 0; font-size: 20px;">${agent.name}</h3>
          <p style="margin: 0; font-size: 13px; color: var(--text-secondary);">${agent.nodes.length} blocks · ${agent.edges.length} connections</p>
          <p style="margin: 8px 0 0 0; font-size: 11px; font-family: var(--font-mono); color: var(--accent-clay);">${new Date(agent.createdAt).toLocaleDateString()}</p>
        </div>
      `;
      
      card.addEventListener('click', () => {
        store.setState({ currentCanvas: { nodes: agent.nodes, edges: agent.edges } });
        showToast(`Loaded ${agent.name}`, 'success');
        if ((window as any).appNavigate) (window as any).appNavigate('canvas');
      });
      
      list.appendChild(card);
    });
  } catch (err) {
    list.innerHTML = `<p style="color: red;">Failed to load vault.</p>`;
  }

  return container;
}
