interface AlgorithmMenuItem {
  algorithmTitle: string;
  algorithmURL: string;
}

const algorithmMenuItems: AlgorithmMenuItem[] = [
  {
    algorithmTitle: "Quick Sort",
    algorithmURL: "/algorithms/quick-sort",
  },
  {
    algorithmTitle: "Merge Sort",
    algorithmURL: "/algorithms/merge-sort",
  },
  {
    algorithmTitle: "BFS",
    algorithmURL: "/algorithms/bfs",
  },
  {
    algorithmTitle: "DFS",
    algorithmURL: "/algorithms/dfs",
  },
  {
    algorithmTitle: "Times Tables",
    algorithmURL: "/algorithms/times-tables",
  },
  {
    algorithmTitle: "Traveling Salesman",
    algorithmURL: "/algorithms/traveling-salesman",
  },
];

export default algorithmMenuItems;
