export const failureScenarios = [
  { id: 'timeout', label: 'Tool Timeout', desc: 'The API took too long to respond.' },
  { id: 'denied', label: 'Permission Denied', desc: 'OAuth token expired.' },
  { id: 'inject', label: 'Prompt Injection', desc: 'Malicious instructions in an email.' }
];
