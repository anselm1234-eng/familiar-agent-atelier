// Simple DOM helper to create elements with classes and text
export function el(tag: string, className = '', text = ''): HTMLElement {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.innerText = text;
  return element;
}
