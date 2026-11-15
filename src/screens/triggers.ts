export function renderTriggers(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px'; container.style.maxWidth = '800px'; container.style.margin = '0 auto';
  container.innerHTML = `
    <header style="margin-bottom: 40px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Trigger Designer</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Define when your agent wakes up.</p>
    </header>
    <div style="background: var(--bg-surface); padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        <div style="flex: 1;">
          <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px;">Frequency</label>
          <select id="freq" style="width: 100%; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: var(--bg-body); color: var(--text-primary); font-family: inherit; font-size: 15px;">
            <option value="daily">Every Day</option>
            <option value="weekdays">Weekdays (Mon-Fri)</option>
            <option value="weekly">Every Week</option>
          </select>
        </div>
        <div style="flex: 1;">
          <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px;">Time</label>
          <input type="time" id="time" value="08:00" style="width: 100%; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: var(--bg-body); color: var(--text-primary); font-family: inherit; font-size: 15px;">
        </div>
      </div>
      <div id="human-readable" style="background: var(--accent-lavender); color: #1A1A1A; padding: 16px; border-radius: var(--radius-md); font-weight: 500; font-size: 15px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 20px;">⏰</span> <span id="readable-text">Runs every day at 8:00 AM</span>
      </div>
    </div>
  `;
  const freq = container.querySelector('#freq') as HTMLSelectElement;
  const time = container.querySelector('#time') as HTMLInputElement;
  const readable = container.querySelector('#readable-text') as HTMLElement;

  const updateText = () => {
    const f = freq.value === 'daily' ? 'Every day' : freq.value === 'weekdays' ? 'Weekdays' : 'Every week';
    const [h, m] = time.value.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    readable.innerText = `${f} at ${h12}:${m} ${ampm}`;
  };
  freq.addEventListener('change', updateText); time.addEventListener('change', updateText);
  return container;
}
