import { renderHearth } from './screens/hearth';
import { renderVault } from './screens/vault';
import { renderSimulator } from './screens/simulator';
import { renderAtelier } from './screens/atelier';
import { renderCanvas } from './screens/canvas';
import { renderLibrary } from './screens/library';
import { renderRituals } from './screens/rituals';
import { renderTranslator } from './screens/translator';
import { renderDnaCard } from './screens/dna-card';
import { renderStudio } from './screens/studio';
import { renderSkillTree } from './screens/skill-tree';
import { renderTriggers } from './screens/triggers';
import { renderTools } from './screens/tools';
import { renderGuardrails } from './screens/guardrails';
import { renderPersona } from './screens/persona';

export function mountApp() {
  const root = document.querySelector<HTMLDivElement>('#app')!;
  
  const routes = [
    { id: 'hearth', label: 'Hearth' }, { id: 'atelier', label: 'Atelier (Genome)' },
    { id: 'skill-tree', label: 'Skill Tree' }, { id: 'canvas', label: 'Blueprint Canvas' },
    { id: 'triggers', label: 'Trigger Designer' }, { id: 'tools', label: 'Tool Registry' },
    { id: 'guardrails', label: 'Guardrails' }, { id: 'persona', label: 'Persona Studio' },
    { id: 'simulator', label: 'Simulator' }, { id: 'vault', label: 'Vault' },
    { id: 'library', label: 'Library' }, { id: 'rituals', label: 'Rituals' },
    { id: 'translator', label: 'Translator' }, { id: 'dna-card', label: 'DNA Card' },
    { id: 'studio', label: 'Studio' }
  ];

  const navHTML = routes.map(r => `<div class="nav-item" data-route="${r.id}">${r.label}</div>`).join('');

  root.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <h2 class="font-serif" style="margin: 0; color: var(--text-primary); font-size: 28px;">Familiar</h2>
        <p style="color: var(--text-secondary); font-size: 13px; margin-top: 4px; font-family: var(--font-mono);">Agent Atelier v1.0</p>
        <nav class="sidebar-nav">${navHTML}</nav>
      </aside>

      <div style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
        <header class="mobile-header">
          <h2 class="font-serif">Familiar</h2>
          <button class="menu-toggle" id="mobile-menu-toggle">
            <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          </button>
        </header>
        <main class="main-content" id="view-container"></main>
      </div>

      <div class="mobile-drawer-backdrop" id="drawer-backdrop"></div>
      <div class="mobile-drawer" id="mobile-drawer">
        <h2 class="font-serif" style="margin: 0; margin-bottom: 24px;">All Screens</h2>
        <nav class="sidebar-nav" style="margin-top: 0;">${navHTML.replace(/nav-item/g, 'nav-item drawer-link')}</nav>
      </div>
      
      <nav class="bottom-tabs">
        <div class="tab-item active" data-route="hearth"><svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg></div>
        <div class="tab-item" data-route="atelier"><svg viewBox="0 0 24 24"><path d="M7 2v2H5v4h2v2H5v4h2v2H5v4h4v-2h2v2h6v-2h2v2h4v-4h-2v-2h2v-4h-2V8h2V4h-4v2h-2V4H7v2z"/></svg></div>
        <div class="tab-item" data-route="canvas"><svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zm10 0h6v6h-6zm-10 10h6v6H4zm10 0h6v6h-6z"/></svg></div>
        <div class="tab-item" data-route="vault"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 11h-2v2h-2v-2H9v-2h2v-2h2v2h2v2z"/></svg></div>
      </nav>
    </div>
  `;

  const viewContainer = document.getElementById('view-container')!;
  const drawer = document.getElementById('mobile-drawer')!;
  const backdrop = document.getElementById('drawer-backdrop')!;
  
  function toggleDrawer(open: boolean) {
    if (open) { drawer.classList.add('open'); backdrop.classList.add('open'); }
    else { drawer.classList.remove('open'); backdrop.classList.remove('open'); }
  }

  document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => toggleDrawer(true));
  backdrop.addEventListener('click', () => toggleDrawer(false));

  async function navigate(route: string) {
    toggleDrawer(false);
    document.querySelectorAll('.nav-item, .tab-item').forEach(el => el.classList.toggle('active', el.getAttribute('data-route') === route));

    if (route === 'canvas') viewContainer.style.overflow = 'hidden';
    else { viewContainer.style.overflowY = 'auto'; viewContainer.style.overflowX = 'hidden'; }

    viewContainer.innerHTML = '';
    if (route === 'hearth') viewContainer.appendChild(renderHearth());
    if (route === 'atelier') viewContainer.appendChild(renderAtelier());
    if (route === 'skill-tree') viewContainer.appendChild(renderSkillTree());
    if (route === 'canvas') viewContainer.appendChild(renderCanvas());
    if (route === 'triggers') viewContainer.appendChild(renderTriggers());
    if (route === 'tools') viewContainer.appendChild(renderTools());
    if (route === 'guardrails') viewContainer.appendChild(renderGuardrails());
    if (route === 'persona') viewContainer.appendChild(renderPersona());
    if (route === 'simulator') viewContainer.appendChild(renderSimulator());
    if (route === 'vault') viewContainer.appendChild(await renderVault());
    if (route === 'library') viewContainer.appendChild(renderLibrary());
    if (route === 'rituals') viewContainer.appendChild(renderRituals());
    if (route === 'translator') viewContainer.appendChild(renderTranslator());
    if (route === 'dna-card') viewContainer.appendChild(renderDnaCard());
    if (route === 'studio') viewContainer.appendChild(renderStudio());
  }

  document.querySelectorAll('.nav-item, .tab-item').forEach(el => {
    el.addEventListener('click', () => navigate(el.getAttribute('data-route')!));
  });

  (window as any).appNavigate = navigate;
  navigate('hearth');
}
