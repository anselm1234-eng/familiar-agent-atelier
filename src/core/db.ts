const DB_NAME = 'familiar-db';
const DB_VERSION = 1;
const STORE_NAME = 'agents';

export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

export async function saveAgent(agent: any) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(agent);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllAgents(): Promise<any[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Safely seeds or clears the database for the demo
export async function seedDatabase(isSample: boolean) {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    // Clear existing data
    const clearReq = store.clear();
    
    clearReq.onsuccess = () => {
      if (!isSample) {
        resolve(); // If clearing, we stop here
        return;
      }

      // Add Professional Sample Agents
      const samples = [
        {
          id: 'agent_inbox',
          name: 'Executive Assistant Alpha',
          fingerprint: 'PRO-7L',
          nodes: [{ id: '1', type: 'trigger', title: 'Email', desc: 'New email', x: 50, y: 50 }, { id: '2', type: 'action', title: 'Triage', desc: 'Sorts email', x: 300, y: 50 }],
          edges: [{ id: 'e1', from: '1', to: '2' }],
          createdAt: Date.now() - 86400000,
          updatedAt: Date.now() - 86400000
        },
        {
          id: 'agent_morning',
          name: 'Enterprise Data Sync',
          fingerprint: 'ENT-2A',
          nodes: [{ id: '1', type: 'trigger', title: '8AM', desc: 'Wake up', x: 50, y: 50 }, { id: '2', type: 'action', title: 'Calendar', desc: 'Fetch events', x: 300, y: 50 }],
          edges: [{ id: 'e1', from: '1', to: '2' }],
          createdAt: Date.now() - 172800000,
          updatedAt: Date.now() - 172800000
        },
        {
          id: 'agent_bill',
          name: 'Corporate Compliance Bot',
          fingerprint: 'CORP-9X',
          nodes: [{ id: '1', type: 'trigger', title: 'Bank', desc: 'New charge', x: 50, y: 50 }, { id: '2', type: 'guardrail', title: 'Check', desc: 'Is it > $500?', x: 300, y: 50 }],
          edges: [{ id: 'e1', from: '1', to: '2' }],
          createdAt: Date.now() - 259200000,
          updatedAt: Date.now() - 259200000
        }
      ];
      
      samples.forEach(s => store.put(s));
      resolve();
    };
    clearReq.onerror = () => reject(clearReq.error);
  });
}
