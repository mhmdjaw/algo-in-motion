interface Animation {
  action: "FIND_TARGET" | "TARGET_FOUND";
  row: number;
  col: number;
}

interface Cell {
  row: number;
  col: number;
  g: number;
  h: number;
  f: number;
  parent: Cell | null;
}

const pathfinding = (maze: number[][]): Animation[] => {
  const animations: Animation[] = [];

  // initialize start and end cells
  const startCell = {
    row: maze.length - 1,
    col: 0,
    g: 0,
    h: 0,
    f: 0,
    parent: null,
  };
  const endCell = {
    row: 0,
    col: maze[0].length - 1,
    g: 0,
    h: 0,
    f: 0,
    parent: null,
  };

  const openList: Cell[] = [];
  const closedList: Cell[] = [];

  openList.push(startCell);

  while (openList.length !== 0) {
    let currentCell = openList[0];
    let currentIndex = 0;

    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < currentCell.f) {
        currentCell = openList[i];
        currentIndex = i;
      }
    }

    openList.splice(currentIndex, 1);
    closedList.push(currentCell);

    if (currentCell.row === endCell.row && currentCell.col === endCell.col) {
      let current = currentCell;
      while (current.parent != null) {
        current = current.parent;
        if (current.parent != null) {
          animations.push({
            action: "TARGET_FOUND",
            row: current.row,
            col: current.col,
          });
        }
      }
      break;
    }

    if (currentCell !== startCell) {
      animations.push({
        action: "FIND_TARGET",
        row: currentCell.row,
        col: currentCell.col,
      });
    }

    const children: Cell[] = [];
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      const row = currentCell.row + direction[0];
      const col = currentCell.col + direction[1];

      // within range
      if (
        row < 0 ||
        row > maze.length - 1 ||
        col < 0 ||
        col > maze[0].length - 1
      ) {
        continue;
      }

      // not a wall
      if (maze[row][col] === 0) {
        continue;
      }

      const child = {
        row: row,
        col: col,
        g: 0,
        f: 0,
        h: 0,
        parent: currentCell,
      };

      children.push(child);
    }

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      let closed = false;
      for (let j = 0; j < closedList.length; j++) {
        if (
          child.row === closedList[j].row &&
          child.col === closedList[j].col
        ) {
          closed = true;
          break;
        }
      }

      if (closed) {
        continue;
      }

      child.g = currentCell.g + 1;
      child.h =
        Math.abs(endCell.row - child.row) + Math.abs(endCell.col - child.col);
      child.f = child.g + child.h;

      let open = false;

      for (let j = 0; j < openList.length; j++) {
        if (child.row === openList[j].row && child.col === openList[j].col) {
          if (child.g > openList[j].g) {
            open = true;
            break;
          }
        }
      }

      if (!open) {
        openList.push(child);
      }
    }
  }

  return animations;
};

export default pathfinding;
