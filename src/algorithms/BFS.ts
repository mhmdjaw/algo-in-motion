interface Animation {
  action: "VISIT_NODE" | "VISIT_EDGE" | "DEQUEUE_NODE";
  index: number[];
}

const BFS = (graph: number[][]): Animation[] => {
  const animations: Animation[] = [];

  const queue: number[] = [];

  const col: number[] = new Array(graph.length).fill(0);

  // visit the first node
  animations.push({ action: "VISIT_NODE", index: [0] });
  queue.push(0);
  col[0] = 1;

  while (queue.length !== 0) {
    // dequeue node
    const node = queue.shift() as number;
    animations.push({ action: "DEQUEUE_NODE", index: [node] });
    col[node] = 2;
    console.log(node);

    for (let i = 0; i < graph[node].length; i++) {
      console.log("hello");

      if (col[graph[node][i]] === 0) {
        console.log(graph[node][i]);

        // visit node and edge
        animations.push({
          action: "VISIT_EDGE",
          index: [node, graph[node][i]],
        });
        animations.push({ action: "VISIT_NODE", index: [graph[node][i]] });
        queue.push(graph[node][i]);
        col[graph[node][i]] = 1;
      }
    }
  }

  return animations;
};

export default BFS;
