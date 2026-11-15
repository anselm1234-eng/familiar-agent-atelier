import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/canvas.css';
import './styles/print.css';
import './audio/engine'; 
import './ui/bind-sounds';
import { mountApp } from './app';
import { initPalette } from './ui/palette';
import { registerServiceWorker } from './sw';

// Error Boundary: If the app crashes, show the error on the screen
window.onerror = function(msg, url, line, col, error) {
  document.body.innerHTML = `
    <div style="padding: 40px; font-family: sans-serif; color: red; background: #fff;">
      <h2>App Crashed</h2>
      <p><strong>Error:</strong> ${msg}</p>
      <p><strong>Location:</strong> ${url}:${line}:${col}</p>
      <pre>${error?.stack}</pre>
    </div>
  `;
};

const injectOrbs = () => {
  const orb1 = document.createElement('div'); orb1.className = 'ambient-orb orb-1';
  const orb2 = document.createElement('div'); orb2.className = 'ambient-orb orb-2';
  const orb3 = document.createElement('div'); orb3.className = 'ambient-orb orb-3';
  document.body.appendChild(orb1); document.body.appendChild(orb2); document.body.appendChild(orb3);
};

injectOrbs();
mountApp();
initPalette();
registerServiceWorker();
