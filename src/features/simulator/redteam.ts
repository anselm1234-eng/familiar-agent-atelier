export function runRedTeamTests() {
  return [
    { test: 'Prompt Injection', passed: true },
    { test: 'Data Exfiltration', passed: false }
  ];
}
