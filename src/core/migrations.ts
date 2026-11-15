// If we update the app later and change how data is saved, 
// this file prevents older saved agents from breaking the app.
const CURRENT_VERSION = 1;

export function migrateAgentData(agent: any): any {
  let data = { ...agent };
  
  // If the saved data version is older than our current version
  if (!data.version || data.version < CURRENT_VERSION) {
    if (!data.genome) {
      data.genome = { tone: 5, verbosity: 5, proactivity: 5, autonomy: 5, risk: 5, memory: 5, rigor: 5, playfulness: 5 };
    }
    // Update the version to the current one
    data.version = CURRENT_VERSION;
  }

  return data;
}
