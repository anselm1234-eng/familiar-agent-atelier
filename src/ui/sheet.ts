export function openSheet(title: string, contentHTML: string, onSave?: () => void) {
  let backdrop = document.querySelector('.sheet-backdrop') as HTMLElement;
  let sheet = document.querySelector('.sheet') as HTMLElement;

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'sheet-backdrop';
    document.body.appendChild(backdrop);

    sheet = document.createElement('div');
    sheet.className = 'sheet';
    document.body.appendChild(sheet);

    backdrop.addEventListener('click', closeSheet);
  }

  sheet.innerHTML = `
    <h3>${title}</h3>
    ${contentHTML}
    <div class="sheet-actions">
      <button class="btn-secondary" id="sheet-cancel">Cancel</button>
      <button class="btn-primary" id="sheet-save">Save</button>
    </div>
  `;

  // Trigger animation
  requestAnimationFrame(() => {
    backdrop.classList.add('open');
    sheet.classList.add('open');
  });

  sheet.querySelector('#sheet-cancel')?.addEventListener('click', closeSheet);
  sheet.querySelector('#sheet-save')?.addEventListener('click', () => {
    if (onSave) onSave();
    closeSheet();
  });
}

function closeSheet() {
  const backdrop = document.querySelector('.sheet-backdrop');
  const sheet = document.querySelector('.sheet');
  if (backdrop && sheet) {
    backdrop.classList.remove('open');
    sheet.classList.remove('open');
  }
}
