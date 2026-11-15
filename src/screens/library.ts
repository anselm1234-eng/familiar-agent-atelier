import failures from '../data/failures.json';
import glossary from '../data/glossary.json';

export function renderLibrary(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px';
  container.style.maxWidth = '1000px';
  container.style.margin = '0 auto';
  
  container.innerHTML = `
    <header style="margin-bottom: 40px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Library</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Knowledge base and failure patterns.</p>
    </header>
    
    <h2 class="font-serif" style="font-size: 28px; margin-bottom: 24px;">Failure Patterns</h2>
    <div id="failures-list" style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 48px;"></div>
    
    <h2 class="font-serif" style="font-size: 28px; margin-bottom: 24px;">Glossary</h2>
    <div id="glossary-list" style="display: flex; flex-direction: column; gap: 16px;"></div>
  `;

  const fList = container.querySelector('#failures-list')!;
  failures.forEach(f => {
    fList.innerHTML += `
      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm); border-left: 4px solid var(--accent-clay);">
        <h3 style="margin: 0 0 8px 0; font-size: 18px; color: var(--text-primary);">${f.symptom}</h3>
        <p style="margin: 0 0 8px 0; font-size: 14px; color: var(--text-secondary);"><strong>Cause:</strong> ${f.cause}</p>
        <p style="margin: 0; font-size: 14px; color: var(--text-primary);"><strong>Guardrail:</strong> ${f.guardrail}</p>
      </div>
    `;
  });

  const gList = container.querySelector('#glossary-list')!;
  glossary.forEach(g => {
    gList.innerHTML += `
      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
        <h3 style="margin: 0 0 4px 0; font-size: 18px; color: var(--text-primary);">${g.term}</h3>
        <p style="margin: 0; font-size: 14px; color: var(--text-secondary);">${g.definition}</p>
      </div>
    `;
  });

  return container;
}
