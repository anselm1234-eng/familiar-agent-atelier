export function createSlider(
  trait: string, 
  leftLabel: string, 
  rightLabel: string, 
  initialValue: number, 
  onChange: (val: number) => void
): HTMLElement {
  const group = document.createElement('div');
  group.className = 'genome-slider-group';
  
  group.innerHTML = `
    <div class="slider-header">
      <span>${trait.charAt(0).toUpperCase() + trait.slice(1)}</span>
      <span style="color: var(--muted); font-size: 12px;">${leftLabel} ↔ ${rightLabel}</span>
    </div>
    <input type="range" min="1" max="10" value="${initialValue}" data-trait="${trait}">
    <div class="consequence-text" id="text-${trait}"></div>
  `;

  const input = group.querySelector('input') as HTMLInputElement;
  const textEl = group.querySelector('.consequence-text') as HTMLElement;

  const updateConsequence = (val: number) => {
    if (val > 7) textEl.innerText = `High ${trait}: Agent will exhibit strong ${rightLabel.toLowerCase()} behavior.`;
    else if (val < 4) textEl.innerText = `Low ${trait}: Agent will exhibit strong ${leftLabel.toLowerCase()} behavior.`;
    else textEl.innerText = `Balanced ${trait} behavior.`;
  };

  updateConsequence(initialValue);

  input.addEventListener('input', (e) => {
    const val = parseInt((e.target as HTMLInputElement).value);
    updateConsequence(val);
    onChange(val);
  });

  return group;
}
