import { ArrayNumber } from "../components/visualizers/SortingVisualizer/sorting-visualizer-types";

interface Animation {
  action: "SAVE_VALUE" | "UPDATE_PARTITION";
  index: number[];
}

const mergeSort = (array: ArrayNumber[]): Animation[] => {
  const animations: Animation[] = [];
  mergeSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

const mergeSortHelper = (
  array: ArrayNumber[],
  low: number,
  high: number,
  animations: Animation[]
) => {
  const mid = Math.floor((high + low) / 2);

  if (low < high) {
    // call mergeSort on first half
    mergeSortHelper(array, low, mid, animations);
    // call mergeSort on second half
    mergeSortHelper(array, mid + 1, high, animations);
    // merge the two halves
    merge(array, low, mid, high, animations);
  }
};

const merge = (
  array: ArrayNumber[],
  low: number,
  mid: number,
  high: number,
  animations: Animation[]
) => {
  let i = low;
  let j = mid + 1;

  // create a temporary array to merge both halves into it
  const temp: number[] = [];

  // loop over the original array and save values in temp
  while (i <= mid && j <= high) {
    if (array[i].value < array[j].value) {
      // set i to pink
      animations.push({ action: "SAVE_VALUE", index: [i] });
      temp.push(array[i++].value);
    } else {
      // set j to pink
      animations.push({ action: "SAVE_VALUE", index: [j] });
      temp.push(array[j++].value);
    }
  }

  // if right half is done continue adding left half values
  while (i <= mid) {
    // set i to pink
    animations.push({ action: "SAVE_VALUE", index: [i] });
    temp.push(array[i++].value);
  }

  // if left half is done continue adding right half values
  while (j <= high) {
    // set j to pink
    animations.push({ action: "SAVE_VALUE", index: [j] });
    temp.push(array[j++].value);
  }

  // override the new merged array in the main array
  for (let k = 0; k < temp.length; k++) {
    // set low + k to blue and update its value
    animations.push({ action: "UPDATE_PARTITION", index: [low + k, temp[k]] });
    array[low + k].value = temp[k];
  }
};

export default mergeSort;
