export function createRing(percentage: number, size: number = 40, color: string = 'var(--sage)'): SVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('width', size.toString());
  svg.setAttribute('height', size.toString());
  svg.setAttribute('viewBox', '0 0 36 36');
  
  const strokeDasharray = `${percentage}, 100`;
  
  svg.innerHTML = `
    <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(46,42,40,0.1)" stroke-width="4" />
    <path class="circle" stroke-dasharray="${strokeDasharray}" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" />
    <text x="18" y="20.35" text-anchor="middle" font-size="8" fill="var(--ink)" font-weight="bold">${percentage}%</text>
  `;
  return svg;
}
