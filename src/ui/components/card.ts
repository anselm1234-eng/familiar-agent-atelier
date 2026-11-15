export function createCard(
  title: string, 
  desc: string, 
  bgColor: string, 
  onClick: () => void
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.background = bgColor;
  card.style.padding = '24px';
  card.style.borderRadius = 'var(--radius)';
  card.style.boxShadow = 'var(--shadow)';
  card.style.cursor = 'pointer';
  
  card.innerHTML = `
    <h2 style="margin: 0 0 8px 0; font-size: 20px;">${title}</h2>
    <p style="margin: 0; opacity: 0.8; font-size: 14px;">${desc}</p>
  `;

  card.addEventListener('click', onClick);
  return card;
}
