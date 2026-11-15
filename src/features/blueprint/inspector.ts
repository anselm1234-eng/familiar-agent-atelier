import { NodeData } from '../../types/node';
export function openInspector(node: NodeData, onSave: (updatedNode: NodeData) => void) {
  // In the future, this will open the bottom sheet UI
  console.log('Inspecting node:', node.id);
  // Mock save
  onSave({ ...node, title: 'Updated Title' });
}
