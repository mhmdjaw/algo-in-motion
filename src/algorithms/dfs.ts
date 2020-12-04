import { GraphNode } from "../components/visualizers/graph-canvas-types";

interface Animation {
  action: "VISIT_NODE" | "VISIT_EDGE" | "BACKTRACK_NODE" | "BACKTRACK_EDGE";
  index: number[];
}

const dfs = (graph: GraphNode[]): Animation[] => {
  const animations: Animation[] = [];
  const col = new Array(graph.length).fill(0);
  const v = 0;
  dfsVisit(graph, col, v, animations);

  return animations;
};

const dfsVisit = (
  graph: GraphNode[],
  col: number[],
  v: number,
  animations: Animation[]
) => {
  // visit node
  animations.push({ action: "VISIT_NODE", index: [v] });
  col[v] = 1;

  for (let i = 0; i < graph[v].neighbor.length; i++) {
    if (col[graph[v].neighbor[i]] === 0) {
      // visit edge
      animations.push({
        action: "VISIT_EDGE",
        index: [v, graph[v].neighbor[i]],
      });
      dfsVisit(graph, col, graph[v].neighbor[i], animations);
      // backtrack from neighbor
      animations.push({
        action: "BACKTRACK_EDGE",
        index: [v, graph[v].neighbor[i]],
      });
    }
  }

  // current node is done... now backtrack
  animations.push({ action: "BACKTRACK_NODE", index: [v] });
};

export default dfs;
