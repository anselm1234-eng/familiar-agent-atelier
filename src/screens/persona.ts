import { generateSystemPrompt } from '../features/persona/prompt';
import { sounds } from '../audio/sounds';
import { showToast } from '../ui/toast';
import { store } from '../core/store';

export function renderPersona(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px'; container.style.height = '100%'; container.style.display = 'flex'; container.style.flexDirection = 'column'; container.style.maxWidth = '1000px'; container.style.margin = '0 auto';
  
  const prompt = generateSystemPrompt(store.getState().genome, 'My Familiar');

  container.innerHTML = `
    <header style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h1 class="font-serif" style="margin: 0; font-size: 48px;">Persona Studio</h1>
        <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Live system prompt generation based on your Genome.</p>
      </div>
      <button id="copy-prompt" style="background: var(--text-primary); color: var(--bg-surface); border: none; padding: 12px 24px; border-radius: var(--radius-sm); font-weight: 600; cursor: pointer;">Copy Prompt</button>
    </header>
    <div style="flex: 1; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); padding: 24px; overflow-y: auto; box-shadow: var(--shadow-sm);">
      <pre id="prompt-output" style="font-family: var(--font-mono); font-size: 14px; color: var(--text-primary); margin: 0; white-space: pre-wrap; line-height: 1.6;">${prompt}</pre>
    </div>
  `;
  
  const promptEl = container.querySelector('#prompt-output') as HTMLElement;
  
  // Subscribe to store so if genome changes, this prompt updates automatically if open
  const unsubscribe = store.subscribe(() => {
    promptEl.innerText = generateSystemPrompt(store.getState().genome, 'My Familiar');
  });

  // Clean up listener when leaving screen
  const observer = new MutationObserver(() => {
    if (!document.body.contains(container)) {
      unsubscribe();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  container.querySelector('#copy-prompt')?.addEventListener('click', () => {
    navigator.clipboard.writeText(promptEl.innerText);
    sounds.success();
    showToast('Prompt copied!', 'success');
  });
  
  return container;
}
