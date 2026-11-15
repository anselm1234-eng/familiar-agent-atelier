import { toggleFullscreen } from '../ui/fullscreen';
import { createGlyph } from '../ui/components/glyph';
import { createRing } from '../ui/components/ring';
import { store } from '../core/store';

export function renderHearth(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px'; container.style.maxWidth = '1200px'; container.style.margin = '0 auto';
  container.style.position = 'relative'; container.style.zIndex = '10';
  
  const nav = (route: string) => { if ((window as any).appNavigate) (window as any).appNavigate(route); };
  const isSample = store.getState().isSampleMode;

  container.innerHTML = `
    <header style="margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; animation: slide-up 0.5s ease-out;">
      <div>
        <p style="font-size: 14px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Dashboard</p>
        <h1 class="font-serif" style="font-size: 48px; line-height: 1;">Hearth</h1>
      </div>
      <div style="display: flex; gap: 12px; align-items: center;">
        <button id="sample-toggle-btn" style="background: ${isSample ? 'var(--accent-clay)' : 'var(--text-primary)'}; color: ${isSample ? '#1A1A1A' : 'var(--bg-surface)'}; border: none; padding: 10px 20px; border-radius: var(--radius-pill); font-weight: 600; cursor: pointer; box-shadow: var(--shadow-sm); transition: all 0.2s;">
          ${isSample ? 'Clear Sample Data' : 'Load Pro Sample'}
        </button>
        <button id="fullscreen-btn" style="background: var(--bg-surface); backdrop-filter: blur(10px); border: 1px solid var(--border-subtle); padding: 10px 20px; border-radius: var(--radius-pill); font-weight: 600; color: var(--text-primary); cursor: pointer; box-shadow: var(--shadow-sm); transition: all 0.2s;">Fullscreen</button>
      </div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 16px;">
      
      <div class="bento-card" id="card-atelier" style="grid-column: 1 / -1; background: var(--accent-peach); min-height: 200px; flex-direction: row; align-items: center; animation-delay: 0.1s;">
        <div style="max-width: 60%; z-index: 2;">
          <h2 class="font-serif" style="font-size: 32px; margin-bottom: 12px; color: var(--text-on-accent);">${isSample ? 'Executive Assistant Alpha' : 'Grow a New Familiar'}</h2>
          <p style="color: var(--text-on-accent); opacity: 0.8; font-size: 16px; line-height: 1.5;">${isSample ? 'A highly optimized agent configured for enterprise-grade client onboarding and CRM synchronization.' : 'Start by designing the genome. Adjust tone, autonomy, and risk to shape your agent\'s personality before building its blueprint.'}</p>
        </div>
        <div style="font-size: 80px; opacity: 0.2; position: absolute; right: 20px; bottom: -20px; font-family: var(--font-serif); color: var(--text-on-accent); transform: rotate(-15deg);">🧬</div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; grid-column: 1 / -1;">
        
        <div class="bento-card" id="card-canvas" style="background: var(--accent-sage); min-height: 160px; animation-delay: 0.2s;">
          <h3 class="font-serif" style="font-size: 24px; color: var(--text-on-accent);">Blueprint</h3>
          <p style="color: var(--text-on-accent); opacity: 0.8; font-size: 14px; margin-top: 8px;">${isSample ? 'Client Intake Workflow loaded' : 'Design the logic graph.'}</p>
        </div>

        <div class="bento-card" id="card-sim" style="background: var(--accent-lavender); min-height: 160px; animation-delay: 0.3s;">
          <h3 class="font-serif" style="font-size: 24px; color: var(--text-on-accent);">Simulator</h3>
          <p style="color: var(--text-on-accent); opacity: 0.8; font-size: 14px; margin-top: 8px;">${isSample ? 'Simulating heavy workload' : 'Walk through a Tuesday.'}</p>
        </div>

        <div class="bento-card" id="card-vault" style="background: var(--bg-surface); min-height: 160px; animation-delay: 0.4s; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 class="font-serif" style="font-size: 24px; color: var(--text-primary);">Vault</h3>
            <p style="color: var(--text-secondary); font-size: 14px; margin-top: 8px;">Your saved agents.</p>
          </div>
          <div id="hearth-vault-glyphs" style="display: flex; gap: 8px; margin-top: 16px;"></div>
        </div>

        <div class="bento-card" id="card-rituals" style="background: var(--bg-surface); min-height: 160px; animation-delay: 0.5s; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h3 class="font-serif" style="font-size: 24px; color: var(--text-primary);">Rituals</h3>
            <p style="color: var(--text-secondary); font-size: 14px; margin-top: 8px;">${isSample ? '14 day streak' : 'No active streak'}</p>
          </div>
          <div id="hearth-ring"></div>
        </div>

      </div>
    </div>
  `;

  container.querySelector('#hearth-ring')!.appendChild(createRing(isSample ? 100 : 0, 56, isSample ? 'var(--accent-sage)' : 'var(--bg-hover)'));
  
  if (isSample) {
    const glyphContainer = container.querySelector('#hearth-vault-glyphs')!;
    glyphContainer.appendChild(createGlyph('PRO-7L', 32));
    glyphContainer.appendChild(createGlyph('ENT-2A', 32));
    glyphContainer.appendChild(createGlyph('CORP-9X', 32));
  }

  container.querySelector('#sample-toggle-btn')?.addEventListener('click', () => {
    store.toggleSampleMode();
  });
  container.querySelector('#fullscreen-btn')?.addEventListener('click', toggleFullscreen);
  container.querySelector('#card-atelier')?.addEventListener('click', () => nav('atelier'));
  container.querySelector('#card-canvas')?.addEventListener('click', () => nav('canvas'));
  container.querySelector('#card-sim')?.addEventListener('click', () => nav('simulator'));
  container.querySelector('#card-vault')?.addEventListener('click', () => nav('vault'));
  container.querySelector('#card-rituals')?.addEventListener('click', () => nav('rituals'));

  return container;
}
