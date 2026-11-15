import { createRing } from '../ui/components/ring';
import { store } from '../core/store';

export function renderGuardrails(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px'; container.style.maxWidth = '800px'; container.style.margin = '0 auto';
  
  const state = store.getState().guardrails;

  container.innerHTML = `
    <header style="margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h1 class="font-serif" style="margin: 0; font-size: 48px;">Guardrails</h1>
        <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Safety limits and coverage score.</p>
      </div>
      <div style="text-align: center;">
        <div id="ring-container" style="width: 64px; height: 64px;"></div>
        <span style="font-size: 12px; font-weight: 600; margin-top: 8px; display: block;">Coverage</span>
      </div>
    </header>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="font-size: 16px; color: var(--text-primary);">Human-in-the-Loop</strong><br>
          <span style="font-size: 14px; color: var(--text-secondary);">Require approval for high-risk actions.</span>
        </div>
        <label class="switch"><input type="checkbox" id="human-loop-toggle" ${state.humanLoop ? 'checked' : ''}><span class="slider"></span></label>
      </div>
      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <strong style="font-size: 16px; color: var(--text-primary); display: block; margin-bottom: 12px;">Daily Budget Cap</strong>
        <input type="range" id="budget-slider" min="1" max="20" value="${state.budget}" style="width: 100%; margin-bottom: 8px;">
        <span id="budget-text" style="font-size: 14px; color: var(--text-secondary);">Max $${state.budget}.00 / day</span>
      </div>
    </div>
  `;
  
  container.querySelector('#ring-container')!.appendChild(createRing(state.humanLoop ? 75 : 25, 64));
  
  container.querySelector('#human-loop-toggle')?.addEventListener('change', (e) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    store.setState({ guardrails: { ...state, humanLoop: isChecked } });
  });

  const budgetSlider = container.querySelector('#budget-slider') as HTMLInputElement;
  const budgetText = container.querySelector('#budget-text') as HTMLElement;
  budgetSlider.addEventListener('input', (e) => {
    const val = parseInt((e.target as HTMLInputElement).value);
    budgetText.innerText = `Max $${val}.00 / day`;
    store.setState({ guardrails: { ...state, budget: val } });
  });

  return container;
}
