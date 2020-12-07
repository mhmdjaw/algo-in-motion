interface Animation {
  action: "CURRENT_POSSIBILITY" | "CURRENT_SOLUTION";
  index: number[];
}

const travelingSalesman = (d: number[][]): Animation[] => {
  const animations: Animation[] = [];

  const cities = new Array(d.length).fill(false);
  const currentPath: number[] = [];
  const sol: number[] = [];
  const distance = 0;
  const minDistance = Number.MAX_VALUE;

  tsm(cities, d, currentPath, sol, distance, minDistance, animations);

  return animations;
};

const tsm = (
  cities: boolean[],
  d: number[][],
  currentPath: number[],
  sol: number[],
  distance: number,
  minDistance: number,
  animations: Animation[]
): number => {
  if (currentPath.length === cities.length) {
    // current Possibility
    animations.push({
      action: "CURRENT_POSSIBILITY",
      index: currentPath.slice(),
    });
    if (distance < minDistance) {
      // current best path
      minDistance = distance;
      animations.push({
        action: "CURRENT_SOLUTION",
        index: currentPath.slice(),
      });
    }
  } else if (currentPath.length === 0) {
    for (let i = 0; i < cities.length; i++) {
      cities[i] = true;
      currentPath.push(i);
      minDistance = tsm(
        cities,
        d,
        currentPath,
        sol,
        distance,
        minDistance,
        animations
      );
      currentPath.pop();
      cities[i] = false;
    }
    console.log(minDistance);
  } else {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i] === false) {
        cities[i] = true;
        const currentCity = currentPath[currentPath.length - 1];
        currentPath.push(i);
        distance += d[currentCity][i];
        minDistance = tsm(
          cities,
          d,
          currentPath,
          sol,
          distance,
          minDistance,
          animations
        );
        distance -= d[currentCity][i];
        currentPath.pop();
        cities[i] = false;
      }
    }
  }

  return minDistance;
};

export const testTSM = (): void => {
  //   const d = [
  //     [0, 10, 15, 20],
  //     [10, 0, 35, 25],
  //     [15, 35, 0, 30],
  //     [20, 25, 30, 0],
  //   ];

  const d = [
    [0, 10, 15, 20, 34, 34, 45, 34, 34],
    [10, 0, 35, 25, 6, 54, 4, 54, 54],
    [15, 35, 0, 30, 45, 4, 34, 45, 34],
    [20, 25, 30, 0, 45, 3, 34, 45, 5],
    [4, 5, 3, 23, 0, 34, 3, 23, 3],
    [45, 34, 4, 63, 6, 0, 23, 46, 4],
    [57, 3, 346, 7, 56, 3, 0, 677, 43],
    [34, 46, 34, 67, 34, 7, 5, 0, 5],
    [65, 4, 23, 56, 45, 3, 3, 2, 0],
    // [45, 6, 2, 4, 64, 3, 34, 5, 34, 0],
  ];

  travelingSalesman(d);
};

export default travelingSalesman;
