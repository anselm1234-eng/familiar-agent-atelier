import { toggleFullscreen } from '../ui/fullscreen';

export function renderStudio(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px';
  container.style.maxWidth = '800px';
  container.style.margin = '0 auto';
  
  container.innerHTML = `
    <header style="margin-bottom: 40px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Studio</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">App settings and preferences.</p>
    </header>
    
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm);">
        <div>
          <strong style="font-size: 16px; color: var(--text-primary);">Theme</strong><br>
          <span style="font-size: 14px; color: var(--text-secondary);">Light / Dark mode</span>
        </div>
        <button id="theme-btn" style="padding: 10px 20px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); background: var(--bg-hover); color: var(--text-primary); font-weight: 600; cursor: pointer;">Toggle Dark Mode</button>
      </div>

      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm);">
        <div>
          <strong style="font-size: 16px; color: var(--text-primary);">Fullscreen</strong><br>
          <span style="font-size: 14px; color: var(--text-secondary);">Immersive mode</span>
        </div>
        <button id="fs-btn" style="padding: 10px 20px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); background: var(--bg-hover); color: var(--text-primary); font-weight: 600; cursor: pointer;">Enter Fullscreen</button>
      </div>

    </div>
  `;

  const themeBtn = container.querySelector('#theme-btn') as HTMLButtonElement;
  
  // Initialize button text based on current mode
  if (document.body.classList.contains('dark')) themeBtn.innerText = 'Toggle Light Mode';

  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeBtn.innerText = document.body.classList.contains('dark') ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  });

  container.querySelector('#fs-btn')?.addEventListener('click', toggleFullscreen);
  return container;
}
