import { exportMermaid } from '../features/translator/mermaid';
import { exportPseudo } from '../features/translator/pseudo';
import { exportLangChain } from '../features/translator/langchain';
import { exportCrewAI } from '../features/translator/crewai';
import { exportAutoGen } from '../features/translator/autogen';
import { exportAssistants } from '../features/translator/assistants';
import { exportMCP } from '../features/translator/mcp';
import { exportN8N } from '../features/translator/n8n';

export function renderTranslator(): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '32px'; container.style.height = '100%'; container.style.display = 'flex'; container.style.flexDirection = 'column'; container.style.maxWidth = '1000px'; container.style.margin = '0 auto';

  container.innerHTML = `
    <header style="margin-bottom: 24px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Translator</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Export your blueprint to code.</p>
    </header>
    <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
      <select id="lang-select" style="padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-family: inherit; font-size: 14px; background: var(--bg-surface); color: var(--text-primary); outline: none;">
        <option value="mermaid">Mermaid.js</option>
        <option value="pseudo">Pseudocode</option>
        <option value="langchain">LangChain</option>
        <option value="crewai">CrewAI</option>
        <option value="autogen">AutoGen</option>
        <option value="assistants">OpenAI Assistants</option>
        <option value="mcp">MCP Manifest</option>
        <option value="n8n">n8n / Zapier</option>
      </select>
      <button id="copy-btn" style="background: var(--text-primary); color: var(--bg-surface); border: none; padding: 12px 24px; border-radius: var(--radius-sm); font-weight: 600; cursor: pointer;">Copy</button>
    </div>
    <pre id="code-output" style="flex: 1; background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); overflow: auto; font-family: var(--font-mono); font-size: 14px; color: var(--text-primary); margin: 0; white-space: pre-wrap; box-shadow: var(--shadow-sm);"></pre>
  `;

  const select = container.querySelector('#lang-select') as HTMLSelectElement;
  const output = container.querySelector('#code-output') as HTMLElement;
  const copyBtn = container.querySelector('#copy-btn') as HTMLButtonElement;

  const mockNodes = [{ id: '1', title: 'Trigger' }, { id: '2', title: 'Action' }];
  const mockEdges = [{ from: '1', to: '2' }];

  const updateCode = () => {
    const v = select.value;
    if (v === 'mermaid') output.innerText = exportMermaid(mockNodes, mockEdges);
    if (v === 'pseudo') output.innerText = exportPseudo(mockNodes, mockEdges);
    if (v === 'langchain') output.innerText = exportLangChain(mockNodes, mockEdges);
    if (v === 'crewai') output.innerText = exportCrewAI(mockNodes, mockEdges);
    if (v === 'autogen') output.innerText = exportAutoGen(mockNodes, mockEdges);
    if (v === 'assistants') output.innerText = exportAssistants(mockNodes, mockEdges);
    if (v === 'mcp') output.innerText = exportMCP(mockNodes, mockEdges);
    if (v === 'n8n') output.innerText = exportN8N(mockNodes, mockEdges);
  };

  select.addEventListener('change', updateCode);
  copyBtn.addEventListener('click', () => { navigator.clipboard.writeText(output.innerText); copyBtn.innerText = 'Copied!'; setTimeout(() => copyBtn.innerText = 'Copy', 2000); });

  updateCode(); return container;
}
