export function encodeBlueprint(data: any): string {
  return btoa(encodeURIComponent(JSON.stringify(data)));
}
export function decodeBlueprint(hash: string): any {
  return JSON.parse(decodeURIComponent(atob(hash)));
}
