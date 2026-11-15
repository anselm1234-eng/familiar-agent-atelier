import { toolCatalog } from './catalog';
export function getToolById(id: string) {
  return toolCatalog.find(t => t.id === id);
}
export function getAllTools() {
  return toolCatalog;
}
