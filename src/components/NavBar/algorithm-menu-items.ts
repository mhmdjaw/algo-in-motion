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
];

export default algorithmMenuItems;
