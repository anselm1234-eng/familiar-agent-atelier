// Generates a deterministic SVG shape based on the fingerprint string
export function createGlyph(fingerprint: string, size: number = 64): SVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('width', size.toString());
  svg.setAttribute('height', size.toString());
  svg.setAttribute('viewBox', '0 0 100 100');

  // Hash the string to get a number
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    hash = fingerprint.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color1 = `hsl(${Math.abs(hash) % 360}, 60%, 75%)`;
  const color2 = `hsl(${Math.abs(hash + 50) % 360}, 60%, 65%)`;
  const points = 3 + (Math.abs(hash) % 5);

  // Create a polygon
  let polygon = `<polygon points="`;
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const r = 30 + (Math.abs(hash + i) % 20);
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    polygon += `${x},${y} `;
  }
  polygon += `" fill="${color1}" stroke="${color2}" stroke-width="4" />`;

  svg.innerHTML = `
    <defs>
      <radialGradient id="grad-${hash}" cx="30%" cy="30%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#grad-${hash})" />
    ${polygon}
  `;

  return svg;
}
