import { sounds } from '../audio/sounds';
import { toggleFullscreen } from './fullscreen';

interface Command {
  id: string;
  label: string;
  category: string;
  action: () => void;
}

let overlay: HTMLElement | null = null;
let inputEl: HTMLInputElement | null = null;
let listEl: HTMLElement | null = null;
let selectedIndex = 0;
let filteredCommands: Command[] = [];

export function initPalette() {
  const commands: Command[] = [
    { id: 'nav-hearth', label: 'Go to Hearth', category: 'Navigation', action: () => (window as any).appNavigate('hearth') },
    { id: 'nav-atelier', label: 'Go to Atelier', category: 'Navigation', action: () => (window as any).appNavigate('atelier') },
    { id: 'nav-skill', label: 'Go to Skill Tree', category: 'Navigation', action: () => (window as any).appNavigate('skill-tree') },
    { id: 'nav-canvas', label: 'Go to Blueprint Canvas', category: 'Navigation', action: () => (window as any).appNavigate('canvas') },
    { id: 'nav-triggers', label: 'Go to Trigger Designer', category: 'Navigation', action: () => (window as any).appNavigate('triggers') },
    { id: 'nav-tools', label: 'Go to Tool Registry', category: 'Navigation', action: () => (window as any).appNavigate('tools') },
    { id: 'nav-guards', label: 'Go to Guardrails', category: 'Navigation', action: () => (window as any).appNavigate('guardrails') },
    { id: 'nav-persona', label: 'Go to Persona Studio', category: 'Navigation', action: () => (window as any).appNavigate('persona') },
    { id: 'nav-sim', label: 'Go to Simulator', category: 'Navigation', action: () => (window as any).appNavigate('simulator') },
    { id: 'nav-vault', label: 'Go to Vault', category: 'Navigation', action: () => (window as any).appNavigate('vault') },
    { id: 'nav-library', label: 'Go to Library', category: 'Navigation', action: () => (window as any).appNavigate('library') },
    { id: 'nav-rituals', label: 'Go to Rituals', category: 'Navigation', action: () => (window as any).appNavigate('rituals') },
    { id: 'nav-trans', label: 'Go to Translator', category: 'Navigation', action: () => (window as any).appNavigate('translator') },
    { id: 'nav-dna', label: 'Go to DNA Card', category: 'Navigation', action: () => (window as any).appNavigate('dna-card') },
    { id: 'nav-studio', label: 'Go to Studio', category: 'Navigation', action: () => (window as any).appNavigate('studio') },
    { id: 'sys-fullscreen', label: 'Toggle Fullscreen', category: 'System', action: () => toggleFullscreen() },
  ];

  function createPalette() {
    overlay = document.createElement('div');
    overlay.className = 'palette-overlay';
    overlay.innerHTML = `
      <div class="palette-modal">
        <input type="text" id="palette-input" placeholder="Type a command or search..." autocomplete="off">
        <div class="palette-list" id="palette-list"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    inputEl = document.getElementById('palette-input') as HTMLInputElement;
    listEl = document.getElementById('palette-list');

    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePalette(); });

    inputEl.addEventListener('input', (e) => {
      const val = (e.target as HTMLInputElement).value.toLowerCase();
      filteredCommands = commands.filter(c => c.label.toLowerCase().includes(val) || c.category.toLowerCase().includes(val));
      selectedIndex = 0;
      renderList();
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePalette();
      if (e.key === 'ArrowDown') { e.preventDefault(); selectedIndex = (selectedIndex + 1) % filteredCommands.length; renderList(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length; renderList(); }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) executeCommand(filteredCommands[selectedIndex]);
      }
    });
  }

  function renderList() {
    if (!listEl) return;
    listEl.innerHTML = '';
    
    if (filteredCommands.length === 0) {
      listEl.innerHTML = '<div style="padding: 16px; color: var(--text-secondary); text-align: center;">No commands found.</div>';
      return;
    }

    filteredCommands.forEach((cmd, index) => {
      const item = document.createElement('div');
      item.className = `palette-item ${index === selectedIndex ? 'selected' : ''}`;
      item.innerHTML = `<span class="palette-category">${cmd.category}</span><span class="palette-label">${cmd.label}</span>`;
      item.addEventListener('mouseenter', () => { selectedIndex = index; renderList(); });
      item.addEventListener('click', () => executeCommand(cmd));
      listEl!.appendChild(item);
    });
  }

  function executeCommand(cmd: Command) {
    sounds.success();
    closePalette();
    cmd.action();
  }

  function closePalette() {
    if (overlay) overlay.classList.remove('open');
  }

  // Global Shortcut (Cmd+K / Ctrl+K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay?.classList.contains('open')) closePalette();
      else openPalette();
    }
  });

  // --- EXPORTED FUNCTION FOR MOBILE MENU BUTTON ---
  (window as any).openPalette = () => {
    if (!overlay) createPalette();
    overlay!.classList.add('open');
    inputEl!.value = '';
    filteredCommands = [...commands];
    selectedIndex = 0;
    renderList();
    setTimeout(() => inputEl!.focus(), 50);
  };
}
