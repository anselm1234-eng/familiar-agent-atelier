import { sounds } from '../audio/sounds';

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'BUTTON' || target.classList.contains('nav-item') || target.classList.contains('tab-item') || target.classList.contains('card')) {
    sounds.click();
  }
});
