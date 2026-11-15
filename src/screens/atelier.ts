import { Genome, traitLabels, getFingerprint } from '../features/genome';
import { createSlider } from '../ui/components/slider';
import { store } from '../core/store';

export function renderAtelier(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px'; container.style.maxWidth = '800px'; container.style.margin = '0 auto';

  // Reads directly from store (which now holds the Pro genome if sample mode is on)
  let currentGenome = { ...store.getState().genome };

  const updateUI = () => {
    const fingerprintEl = document.getElementById('fingerprint') as HTMLElement;
    if (fingerprintEl) fingerprintEl.innerText = getFingerprint(currentGenome);
    store.setState({ genome: currentGenome });
  };

  container.innerHTML = `
    <header style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 class="font-serif" style="margin: 0; font-size: 48px;">Atelier</h1>
        <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Design your familiar's genome.</p>
      </div>
      <div style="background: var(--accent-lavender); color: #1A1A1A; padding: 12px 24px; border-radius: var(--radius-md); font-family: var(--font-mono); font-weight: bold; font-size: 16px;">
        <span id="fingerprint">${getFingerprint(currentGenome)}</span>
      </div>
    </header>
    <div id="sliders-container" style="display: flex; flex-direction: column; gap: 16px;"></div>
  `;

  const slidersContainer = container.querySelector('#sliders-container')!;
  Object.keys(traitLabels).forEach((key) => {
    const trait = key as keyof Genome;
    const [leftLabel, rightLabel] = traitLabels[trait];
    const slider = createSlider(trait, leftLabel, rightLabel, currentGenome[trait], (val) => {
      currentGenome[trait] = val;
      updateUI();
    });
    slidersContainer.appendChild(slider);
  });

  return container;
}
