import { ArrayNumber } from "../components/visualizers/SortingVisualizer/sorting-visualizer-array";

interface Animation {
  action:
    | "PIVOT"
    | "SWAP_COLOR"
    | "ITERATE_LOW"
    | "ITERATE_HIGH"
    | "SWAP_VALUES"
    | "SWAP_PIVOT"
    | "SWAP_DONE"
    | "SWAP_PIVOT_DONE";
  index: number[];
}

export const quickSort = (array: ArrayNumber[]): Animation[] => {
  const animations: Animation[] = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

const quickSortHelper = (
  array: ArrayNumber[],
  low: number,
  high: number,
  animations: Animation[]
): void => {
  if (low < high) {
    const p = partition(array, low, high, animations);
    // call quicksort on lower half of the array
    quickSortHelper(array, low, p - 1, animations);
    // call quicksort on the upper half the array
    quickSortHelper(array, p + 1, high, animations);
  }
};

const partition = (
  array: ArrayNumber[],
  low: number,
  high: number,
  animations: Animation[]
): number => {
  // pivot is array[low]
  let i = low + 1;
  let j = high;
  // set pivot to yellow, i to green, j to green
  animations.push({ action: "PIVOT", index: [low, i, j] });

  while (i <= j) {
    // skip values that are lower than pivot on the left side
    while (i <= high && array[i].value < array[low].value) {
      // set i back to blue and i+1 to green
      animations.push({ action: "ITERATE_LOW", index: [i] });
      i++;
    }

    // skip values that are higher than pivot on the right side
    while (j > low && array[j].value > array[low].value) {
      // set j to blue and j+1 to green
      animations.push({ action: "ITERATE_HIGH", index: [j] });
      j--;
    }

    if (i <= j) {
      // swap left value with right value
      // set i and j to red
      animations.push({ action: "SWAP_COLOR", index: [i, j] });
      const temp = array[i].value;
      array[i].value = array[j].value;
      array[j].value = temp;
      // do swap animation
      animations.push({
        action: "SWAP_VALUES",
        index: [i, array[i].value, j, array[j].value],
      });
      // set i and j back to blue
      animations.push({ action: "SWAP_DONE", index: [i, j] });
      i++, j--;
    }
  }

  // swap pivot with left side value (i.e with j since it's lower than i at this point)
  // set pivot and j to red and i to blue
  animations.push({ action: "SWAP_PIVOT", index: [low, j, i] });
  const temp = array[low].value;
  array[low].value = array[j].value;
  array[j].value = temp;
  // do swap animation
  animations.push({
    action: "SWAP_VALUES",
    index: [low, array[low].value, j, array[j].value],
  });
  // set pivot and j back to blue
  animations.push({ action: "SWAP_PIVOT_DONE", index: [low, j] });
  return j;
};
