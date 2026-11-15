export function exportMCP(nodes: any[], edges: any[]): string {
  return `{\n  "mcpServers": {\n    "my-agent": {\n      "command": "node",\n      "args": ["server.js"]\n    }\n  }\n}`;
}
