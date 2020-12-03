export interface NodePosition {
  x: number;
  y: number;
}

export interface Edge {
  id: string;
  from: number;
  to: number;
}

export interface GraphNode {
  id: string;
  neighbor: number[];
}

export interface Graph {
  graph: GraphNode[];
  edges: Edge[];
}
