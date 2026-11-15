import { openSheet } from '../ui/sheet';
import { saveAgent } from '../core/db';
import { showToast } from '../ui/toast';
import { sounds } from '../audio/sounds';
import { store } from '../core/store';
import { autoLayout } from '../features/blueprint/layout';
import { validateGraph } from '../features/blueprint/validate';

export function renderCanvas(): HTMLElement {
  const container = document.createElement('div'); 
  container.className = 'canvas-container';

  const loadedState = store.getState().currentCanvas;
  let nodes = loadedState ? loadedState.nodes : [
    { id: 'n1', type: 'trigger', title: 'Morning Cron', desc: 'Triggers at 8:00 AM', x: 50, y: 100 },
    { id: 'n2', type: 'action', title: 'Fetch Calendar', desc: 'Reads todays events', x: 320, y: 200 }
  ];
  let edges = loadedState ? loadedState.edges : [{ id: 'e1', from: 'n1', to: 'n2' }];

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, 'svg'); 
  svg.classList.add('svg-layer'); 
  container.appendChild(svg);

  const minimap = document.createElement('div'); 
  minimap.className = 'minimap'; 
  container.appendChild(minimap);
  const nodeElements: Record<string, HTMLElement> = {};

  const renderAll = () => {
    container.querySelectorAll('.canvas-node').forEach(el => el.remove());
    nodes.forEach(renderNode);
    updateEdges(edges, nodeElements, svg);
    updateMinimap(nodes, minimap);
    updateValidity(nodes, edges, container);
  };

  const renderNode = (node: any) => {
    const el = document.createElement('div'); 
    el.className = `canvas-node node-${node.type}`;
    el.style.left = `${node.x}px`; 
    el.style.top = `${node.y}px`;
    
    // ADDED: A dedicated Edit button next to the Delete button
    el.innerHTML = `
      <div class="node-header">
        <span>${node.title}</span>
        <div style="display: flex; gap: 4px;">
          <button class="edit-btn" data-id="${node.id}" style="background: transparent; border: none; cursor: pointer; opacity: 0.6; font-size: 14px;">✏️</button>
          <button class="delete-btn" data-id="${node.id}" style="background: transparent; border: none; cursor: pointer; opacity: 0.6; font-size: 16px;">×</button>
        </div>
      </div>
      <div class="node-body">${node.desc}</div>
      <div class="port port-top" data-id="${node.id}"></div>
      <div class="port port-bottom" data-id="${node.id}"></div>
    `;

    // Helper function to open the bottom sheet
    const openEditSheet = () => {
      openSheet('Edit Node', `
        <input type="text" id="edit-title" value="${node.title}" style="font-size: 16px; margin-bottom: 12px;">
        <textarea id="edit-desc" style="min-height: 80px;">${node.desc}</textarea>
      `, () => {
        node.title = (document.getElementById('edit-title') as HTMLInputElement).value;
        node.desc = (document.getElementById('edit-desc') as HTMLTextAreaElement).value;
        renderAll(); 
        store.setState({ currentCanvas: { nodes, edges } });
      });
    };

    // Open sheet on body click
    el.querySelector('.node-body')?.addEventListener('click', (e) => {
      e.stopPropagation();
      openEditSheet();
    });

    // Open sheet on edit button click
    el.querySelector('.edit-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      openEditSheet();
    });

    el.querySelector('.delete-btn')?.addEventListener('click', (e) => {
      e.stopPropagation(); 
      nodes = nodes.filter(n => n.id !== node.id); 
      edges = edges.filter(edge => edge.from !== node.id && edge.to !== node.id);
      renderAll(); store.setState({ currentCanvas: { nodes, edges } });
    });

    container.appendChild(el); 
    nodeElements[node.id] = el; 
    setupDrag(el, node, edges, svg, nodes);
    setupPorts(el, node, edges, svg, nodeElements);
  };

  renderAll();

  const toolbar = document.createElement('div'); 
  toolbar.className = 'canvas-toolbar';
  toolbar.innerHTML = `
    <button class="toolbar-btn" id="add-node-btn">+ Block</button>
    <button class="toolbar-btn" id="layout-btn" style="background: var(--accent-lavender); color: #1A1A1A;">Auto Layout</button>
    <button class="toolbar-btn" id="save-btn" style="background: var(--accent-sage); color: #1A1A1A;">Save</button>
  `;
  container.appendChild(toolbar);

  toolbar.querySelector('#add-node-btn')?.addEventListener('click', () => {
    const newNode = { id: `n${Date.now()}`, type: 'action', title: 'New Task', desc: 'Configure...', x: 200, y: 200 };
    nodes.push(newNode); renderAll(); store.setState({ currentCanvas: { nodes, edges } });
  });

  toolbar.querySelector('#layout-btn')?.addEventListener('click', () => {
    nodes = autoLayout(nodes); sounds.success(); renderAll(); store.setState({ currentCanvas: { nodes, edges } });
  });

  toolbar.querySelector('#save-btn')?.addEventListener('click', () => {
    openSheet('Save Agent', `<input type="text" id="agent-name" value="My Familiar">`, async () => {
      const name = (document.getElementById('agent-name') as HTMLInputElement).value;
      await saveAgent({ id: `agent_${Date.now()}`, name, nodes, edges, createdAt: Date.now() });
      sounds.success(); showToast('Saved to Vault!', 'success');
    });
  });

  return container;
}

// --- FIXED DRAG LOGIC (Only drags if you move 5 pixels) ---
function setupDrag(el: HTMLElement, nodeData: { x: number, y: number }, edges: any[], svg: SVGSVGElement, allNodes: any[]) {
  let startX = 0, startY = 0, initialX = 0, initialY = 0, isDragging = false;

  el.addEventListener('pointerdown', (e) => {
    const target = e.target as HTMLElement;
    // Ignore clicks on buttons or ports
    if (target.tagName === 'BUTTON' || target.classList.contains('port')) return;
    
    isDragging = true; 
    startX = e.clientX; startY = e.clientY; initialX = nodeData.x; initialY = nodeData.y;
    el.style.zIndex = '100';
    
    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isDragging) return;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      
      // Only start dragging visually if the mouse moves more than 5px
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        nodeData.x = initialX + dx; nodeData.y = initialY + dy;
        el.style.left = `${nodeData.x}px`; el.style.top = `${nodeData.y}px`;
        const nodeElements: Record<string, HTMLElement> = {};
        document.querySelectorAll('.canvas-node').forEach((domEl, index) => { 
          if (allNodes[index]) nodeElements[allNodes[index].id] = domEl as HTMLElement; 
        });
        updateEdges(edges, nodeElements, svg);
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      el.style.zIndex = '2';
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  });
}

function setupPorts(el: HTMLElement, node: any, edges: any[], svg: SVGSVGElement, nodeElements: Record<string, HTMLElement>) {
  const portBottom = el.querySelector('.port-bottom') as HTMLElement;
  portBottom.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    let tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tempPath.setAttribute('stroke', 'var(--text-primary)'); tempPath.setAttribute('stroke-width', '3'); tempPath.setAttribute('stroke-dasharray', '6,6'); tempPath.setAttribute('fill', 'none');
    svg.appendChild(tempPath);
    const fromX = el.offsetLeft + (el.offsetWidth / 2); const fromY = el.offsetTop + el.offsetHeight;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const rect = svg.getBoundingClientRect(); const toX = moveEvent.clientX - rect.left; const toY = moveEvent.clientY - rect.top;
      tempPath.setAttribute('d', `M ${fromX} ${fromY} C ${fromX} ${fromY + 50}, ${toX} ${toY - 50}, ${toX} ${toY}`);
    };
    const onPointerUp = (upEvent: PointerEvent) => {
      document.removeEventListener('pointermove', onPointerMove); document.removeEventListener('pointerup', onPointerUp); tempPath.remove();
      const targetPort = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
      if (targetPort && targetPort.classList.contains('port-top')) {
        const targetId = targetPort.getAttribute('data-id');
        if (targetId && targetId !== node.id && !edges.find(e => e.from === node.id && e.to === targetId)) {
          edges.push({ id: `e${Date.now()}`, from: node.id, to: targetId }); updateEdges(edges, nodeElements, svg);
        }
      }
    };
    document.addEventListener('pointermove', onPointerMove); document.addEventListener('pointerup', onPointerUp);
  });
}

function updateEdges(edges: any[], nodeElements: Record<string, HTMLElement>, svg: SVGSVGElement) {
  svg.innerHTML = '';
  edges.forEach(edge => {
    const fromEl = nodeElements[edge.from]; const toEl = nodeElements[edge.to];
    if (!fromEl || !toEl) return;
    const fromX = fromEl.offsetLeft + (fromEl.offsetWidth / 2); 
    const fromY = fromEl.offsetTop + fromEl.offsetHeight; 
    const toX = toEl.offsetLeft + (toEl.offsetWidth / 2); 
    const toY = toEl.offsetTop;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', `M ${fromX} ${fromY} C ${fromX} ${fromY + 50}, ${toX} ${toY - 50}, ${toX} ${toY}`);
    path.setAttribute('fill', 'none'); path.setAttribute('stroke', 'var(--text-secondary)'); path.setAttribute('stroke-width', '3'); path.setAttribute('stroke-dasharray', '6,6');
    svg.appendChild(path);
  });
}

function updateValidity(nodes: any[], edges: any[], container: HTMLElement) {
  container.querySelectorAll('.validity-warning').forEach(el => el.remove());
  const warnings = validateGraph(nodes, edges);
  if (warnings.length > 0) {
    const banner = document.createElement('div'); banner.className = 'validity-warning';
    banner.innerHTML = `⚠️ ${warnings[0]}`;
    container.appendChild(banner);
  }
}

function updateMinimap(nodes: any[], minimap: HTMLElement) {
  minimap.innerHTML = '';
  const scale = 0.15;
  nodes.forEach(n => {
    const el = document.createElement('div'); el.className = 'minimap-node';
    el.style.left = `${n.x * scale}px`; el.style.top = `${n.y * scale}px`;
    el.style.background = n.type === 'trigger' ? 'var(--accent-peach)' : n.type === 'action' ? 'var(--accent-sage)' : 'var(--accent-lavender)';
    minimap.appendChild(el);
  });
}
