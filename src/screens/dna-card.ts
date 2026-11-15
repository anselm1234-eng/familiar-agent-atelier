import { createGlyph } from '../ui/components/glyph';
import { getFingerprint, defaultGenome } from '../features/genome';

export function renderDnaCard(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.height = '100%';

  const fingerprint = getFingerprint(defaultGenome);
  const glyph = createGlyph(fingerprint, 120).outerHTML;

  container.innerHTML = `
    <div style="background: var(--bg-surface); width: 100%; max-width: 400px; padding: 40px; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); text-align: center; border: 1px solid var(--border-subtle);">
      <div style="display: flex; justify-content: center; margin-bottom: 32px;">${glyph}</div>
      <h2 class="font-serif" style="margin: 0 0 8px 0; font-size: 32px; color: var(--text-primary);">My Familiar</h2>
      <p style="margin: 0 0 32px 0; font-family: var(--font-mono); font-size: 14px; color: var(--text-secondary); font-weight: bold; letter-spacing: 2px;">${fingerprint}</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; text-align: left; font-size: 14px;">
        <div style="background: var(--bg-body); padding: 12px; border-radius: var(--radius-sm); color: var(--text-primary);"><strong>Tone:</strong> Warm</div>
        <div style="background: var(--bg-body); padding: 12px; border-radius: var(--radius-sm); color: var(--text-primary);"><strong>Autonomy:</strong> High</div>
        <div style="background: var(--bg-body); padding: 12px; border-radius: var(--radius-sm); color: var(--text-primary);"><strong>Risk:</strong> Low</div>
        <div style="background: var(--bg-body); padding: 12px; border-radius: var(--radius-sm); color: var(--text-primary);"><strong>Memory:</strong> Lifelong</div>
      </div>
    </div>
  `;
  return container;
}
