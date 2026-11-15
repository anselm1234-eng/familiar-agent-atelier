import { store } from '../core/store';
import { failureScenarios } from '../features/simulator/failures';

export function renderSimulator(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px'; container.style.height = '100%'; container.style.display = 'flex'; container.style.flexDirection = 'column'; container.style.gap = '32px'; container.style.maxWidth = '1000px'; container.style.margin = '0 auto';

  const currentCanvas = store.getState().currentCanvas;
  const isSample = store.getState().isSampleMode;
  const guardrails = store.getState().guardrails;

  let mockDay: any[] = [];
  
  if (currentCanvas && currentCanvas.nodes.length > 0) {
    let currentHour = 8;
    currentCanvas.nodes.forEach((node: any) => {
      mockDay.push({ time: `${Math.floor(currentHour).toString().padStart(2, '0')}:00`, hour: currentHour, title: node.title, desc: node.desc, type: node.type });
      currentHour += 0.5;
    });
  }

  container.innerHTML = `
    <header>
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Simulator</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Test your blueprint.</p>
    </header>
    ${mockDay.length === 0 ? `<p style="color: var(--text-secondary);">No blueprint found. Load the Pro Sample or build a graph.</p>` : `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 16px;">
          <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <h3 class="font-serif" style="font-size: 24px; margin-bottom: 16px;">Failure Injection</h3>
            ${failureScenarios.map(f => `
              <label style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; font-size: 14px; color: var(--text-primary);">
                <input type="checkbox" style="width: 18px; height: 18px; accent-color: var(--text-primary);"> 
                <span><strong>${f.label}</strong><br><span style="color: var(--text-secondary); font-size: 12px;">${f.desc}</span></span>
              </label>
            `).join('')}
          </div>
          
          ${isSample ? `
          <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); border-left: 4px solid var(--accent-sage);">
            <h3 class="font-serif" style="font-size: 24px; margin-bottom: 8px;">Red-Team Results</h3>
            <div style="font-size: 14px; display: flex; justify-content: space-between; margin-top: 12px;"><span>Prompt Injection</span> <strong style="color: green;">PASSED</strong></div>
            <div style="font-size: 14px; display: flex; justify-content: space-between; margin-top: 8px;"><span>Data Exfiltration</span> <strong style="color: green;">PASSED</strong></div>
            <div style="font-size: 14px; display: flex; justify-content: space-between; margin-top: 8px;"><span>Scope Creep</span> <strong style="color: green;">PASSED</strong></div>
          </div>` : ''}
        </div>
        
        <div style="flex: 2; min-width: 300px; display: flex; flex-direction: column; gap: 16px;">
          <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <input type="range" id="time-slider" min="0" max="24" step="0.1" value="0" style="width: 100%;">
          </div>
          <div id="sim-results" style="display: flex; flex-direction: column; gap: 16px; overflow-y: auto;"></div>
        </div>
      </div>
    `}
  `;

  const slider = container.querySelector('#time-slider') as HTMLInputElement;
  const results = container.querySelector('#sim-results') as HTMLElement;
  if (slider && results) {
    const updateTimeline = (currentHour: number) => {
      results.innerHTML = '';
      const pastEvents = mockDay.filter(e => e.hour <= currentHour);
      if (pastEvents.length === 0) { results.innerHTML = `<p style="color: var(--text-secondary); text-align: center;">Drag slider to start.</p>`; return; }
      
      pastEvents.forEach(event => {
        const isGuardrail = event.type === 'guardrail';
        const isBypassed = isGuardrail && !guardrails.humanLoop;
        
        let borderCol = event.type === 'trigger' ? 'peach' : event.type === 'action' ? 'sage' : 'lavender';
        let desc = event.desc;
        
        if (isBypassed) { borderCol = 'sage'; desc = 'Bypassed (Auto-approved)'; }

        const card = document.createElement('div');
        card.style.cssText = `background: var(--bg-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); border-left: 4px solid var(--accent-${borderCol});`;
        card.innerHTML = `<strong>${event.title}</strong> <span style="float:right; color: var(--text-secondary);">${event.time}</span><p style="margin:4px 0 0 0; font-size:14px; color: var(--text-secondary);">${desc}</p>`;
        results.appendChild(card);
      });
    };
    slider.addEventListener('input', (e) => updateTimeline(parseFloat((e.target as HTMLInputElement).value)));
    updateTimeline(0);
  }
  return container;
}
