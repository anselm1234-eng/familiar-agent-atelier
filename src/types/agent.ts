export interface Agent {
  id: string;
  name: string;
  fingerprint: string;
  createdAt: number;
  updatedAt: number;
  genome: any; 
  nodes: any[];
  edges: any[];
}
