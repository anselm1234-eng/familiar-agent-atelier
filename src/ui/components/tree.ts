export function createSkillNode(title: string, isUnlocked: boolean): HTMLElement {
  const node = document.createElement('div');
  node.style.padding = '12px 24px';
  node.style.borderRadius = '20px';
  node.style.border = '2px solid var(--ink)';
  node.style.background = isUnlocked ? 'var(--lavender)' : '#fff';
  node.style.opacity = isUnlocked ? '1' : '0.5';
  node.style.cursor = isUnlocked ? 'pointer' : 'not-allowed';
  node.style.fontWeight = '600';
  node.innerText = title;
  
  return node;
}
