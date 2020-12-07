export interface NodePosition {
  x: number;
  y: number;
}

export interface Edge {
  id: string;
  from: number;
  to: number;
}

export interface EdgePosition {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface GraphNode {
  id: string;
  neighbor: number[];
}

export interface Graph {
  graph: GraphNode[];
  edges: Edge[];
}

export interface Cities {
  cities: string[];
  edgesPossibility: string[];
  edgesSolution: string[];
}
