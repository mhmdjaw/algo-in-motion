import { GraphNode } from "../components/visualizers/graph-canvas-types";

interface Animation {
  action: "VISIT_NODE" | "VISIT_EDGE" | "DEQUEUE_NODE";
  index: number[];
}

const bfs = (graph: GraphNode[]): Animation[] => {
  const animations: Animation[] = [];

  const queue: number[] = [];

  const col = new Array(graph.length).fill(0);

  // visit the first node
  animations.push({ action: "VISIT_NODE", index: [0] });
  queue.push(0);
  col[0] = 1;

  while (queue.length !== 0) {
    // dequeue node
    const node = queue.shift() as number;
    animations.push({ action: "DEQUEUE_NODE", index: [node] });
    col[node] = 2;

    for (let i = 0; i < graph[node].neighbor.length; i++) {
      if (col[graph[node].neighbor[i]] === 0) {
        // visit edge and neighbor
        animations.push({
          action: "VISIT_EDGE",
          index: [node, graph[node].neighbor[i]],
        });
        animations.push({
          action: "VISIT_NODE",
          index: [graph[node].neighbor[i]],
        });
        queue.push(graph[node].neighbor[i]);
        col[graph[node].neighbor[i]] = 1;
      }
    }
  }

  return animations;
};

export default bfs;
