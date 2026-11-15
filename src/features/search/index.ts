export function globalSearch(query: string, data: any[]): any[] {
  const q = query.toLowerCase();
  return data.filter(item => JSON.stringify(item).toLowerCase().includes(q));
}
