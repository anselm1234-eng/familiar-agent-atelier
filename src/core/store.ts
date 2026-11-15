import { defaultGenome } from '../features/genome';
import { seedDatabase } from './db';

type Listener = () => void;

class Store {
  private state: any = {
    agents: [],
    currentAgentId: null,
    currentCanvas: null as { nodes: any[], edges: any[] } | null,
    genome: { ...defaultGenome },
    guardrails: { humanLoop: true, budget: 5 },
    activeTools: [] as string[],
    unlockedSkills: [] as string[],
    settings: { soundEnabled: true, theme: 'light' },
    isSampleMode: false 
  };

  private listeners: Set<Listener> = new Set();

  constructor() {
    try {
      const saved = localStorage.getItem('familiar_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      localStorage.removeItem('familiar_state');
    }
  }

  getState() { return this.state; }

  setState(newState: Partial<typeof this.state>) {
    this.state = { ...this.state, ...newState };
    try {
      const toSave = {
        genome: this.state.genome,
        guardrails: this.state.guardrails,
        activeTools: this.state.activeTools,
        unlockedSkills: this.state.unlockedSkills,
        settings: this.state.settings,
        currentCanvas: this.state.currentCanvas,
        isSampleMode: this.state.isSampleMode
      };
      localStorage.setItem('familiar_state', JSON.stringify(toSave));
    } catch(e) {}
    this.notify();
  }

  async toggleSampleMode() {
    const isSample = !this.state.isSampleMode;
    
    if (isSample) {
      // LOAD PROFESSIONAL DATA
      this.state.isSampleMode = true;
      this.state.genome = { tone: 8, verbosity: 6, proactivity: 9, autonomy: 7, risk: 3, memory: 9, rigor: 9, playfulness: 2 };
      this.state.guardrails = { humanLoop: true, budget: 50 };
      this.state.activeTools = ['gmail-read', 'gmail-send', 'cal-read', 'notion-write'];
      this.state.unlockedSkills = ['email-read', 'email-triage', 'email-draft', 'cal-read', 'cal-schedule', 'web-search', 'web-summarize'];
      this.state.currentCanvas = {
        nodes: [
          { id: 'n1', type: 'trigger', title: 'New Client Intake', desc: 'Webhook from website form', x: 50, y: 100 },
          { id: 'n2', type: 'action', title: 'Parse Form Data', desc: 'Extract name, email, company', x: 350, y: 100 },
          { id: 'n3', type: 'action', title: 'Create Notion CRM', desc: 'Add to Client Pipeline database', x: 650, y: 100 },
          { id: 'n4', type: 'guardrail', title: 'Slack Approval', desc: 'Ping #sales for quick review', x: 500, y: 300 },
          { id: 'n5', type: 'action', title: 'Send Welcome Email', desc: 'Send personalized onboarding', x: 500, y: 500 }
        ],
        edges: [
          { id: 'e1', from: 'n1', to: 'n2' },
          { id: 'e2', from: 'n2', to: 'n3' },
          { id: 'e3', from: 'n3', to: 'n4' },
          { id: 'e4', from: 'n4', to: 'n5' }
        ]
      };
    } else {
      // RESET TO CLEAN SLATE
      this.state.isSampleMode = false;
      this.state.genome = { ...defaultGenome };
      this.state.guardrails = { humanLoop: true, budget: 5 };
      this.state.activeTools = [];
      this.state.unlockedSkills = ['email-read', 'cal-read', 'web-search'];
      this.state.currentCanvas = null;
    }
    
    this.setState(this.state);
    await seedDatabase(isSample); // Sync the DB
    
    // Refresh the current view
    if ((window as any).appNavigate) {
      (window as any).appNavigate('hearth');
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  private notify() { this.listeners.forEach(l => l()); }
}

export const store = new Store();
