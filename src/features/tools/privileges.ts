export function checkPrivileges(activeTools: string[]): string[] {
  const warnings = [];
  if (activeTools.includes('gmail-send')) {
    warnings.push("High risk: Agent can send emails without approval.");
  }
  return warnings;
}
