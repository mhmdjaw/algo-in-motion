import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import quickSort from "../../../algorithms/quick-sort";
import mergeSort from "../../../algorithms/merge-sort";
import { useTheme } from "@material-ui/core/styles";
import { ArrayNumber } from "./sorting-visualizer-types";
import { Box } from "@material-ui/core";
import useSortingVisualizerStyles from "./sorting-visualizer-styles";
import { useDispatch, useSelector } from "react-redux";
import {
  resetVisualizer,
  visualizationComplete,
} from "../../../redux/visualizer/visualizer-actions";
import { VisualizerState } from "../../../redux/visualizer/visualizer-types";
import { OptionsState } from "../../../redux/options/options-types";
import { useLocation } from "react-router-dom";
import { MERGE_SORT, QUICK_SORT } from "../../../algorithms/algorithm-types";
import { randomNumberInterval } from "../../../heplers";
import { testTSM } from "../../../algorithms/traveling-salesman";

interface RootState {
  visualizer: VisualizerState;
  options: OptionsState;
}

const SortingVisualizer: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [array, setArray] = useState<Array<ArrayNumber>>([]);
  const barRef = useRef<Array<HTMLDivElement | null>>([]);
  const timeouts = useRef<Array<NodeJS.Timeout>>([]);

  const classes = useSortingVisualizerStyles();
  const theme = useTheme();
  const color = theme.palette;
  const [PRIMARY_COLOR, SECONDARY_COLOR, YELLOW, RED, GREEN] = [
    color.primary.main,
    color.secondary.main,
    "yellow",
    "red",
    "lime",
  ];

  const range = state.options.size;
  const animationSpeed =
    (1 - state.options.speed / 100) * (3 + (310 - state.options.size)) + 5;

  const totalBarWidths = 90 - ((90 - 50) / 306) * (range - 4);
  const width = totalBarWidths / range;

  const resetArray = useCallback(() => {
    timeouts.current.map((timeout) => clearTimeout(timeout));

    const newArray: Array<ArrayNumber> = [];

    for (let i = 0; i < range; i++) {
      newArray.push({
        id: uuidv4(),
        value: (randomNumberInterval(4, 200) / 200) * 100,
      });
    }

    barRef.current = new Array(newArray.length);
    setArray(newArray);
  }, [range]);

  const quickSortRun = useCallback(() => {
    const animations = quickSort(array);
    timeouts.current = new Array(animations.length + 1);

    animations.forEach((animation, index) => {
      switch (animation.action) {
        case "PIVOT": {
          const pivot = animation.index[0];
          const i = animation.index[1];
          const j = animation.index[2];
          const pivotBar = barRef.current[pivot]?.style;
          const iBar = barRef.current[i]?.style;
          const jBar = barRef.current[j]?.style;

          timeouts.current[index] = setTimeout(() => {
            console.log("hello");
            if (pivotBar) pivotBar.background = YELLOW;
            if (iBar) iBar.background = GREEN;
            if (jBar) jBar.background = GREEN;
          }, index * animationSpeed);

          break;
        }

        case "ITERATE_LOW": {
          const i = animation.index[0];
          const iBar = barRef.current[i]?.style;
          const nextBar = barRef.current[i + 1]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (iBar) iBar.background = SECONDARY_COLOR;
            if (nextBar) nextBar.background = GREEN;
          }, index * animationSpeed);

          break;
        }

        case "ITERATE_HIGH": {
          const j = animation.index[0];
          const jBar = barRef.current[j]?.style;
          const nextBar = barRef.current[j - 1]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (jBar) jBar.background = SECONDARY_COLOR;
            if (nextBar) nextBar.background = GREEN;
          }, index * animationSpeed);

          break;
        }

        case "SWAP_COLOR": {
          const i = animation.index[0];
          const j = animation.index[1];
          const iBar = barRef.current[i]?.style;
          const jBar = barRef.current[j]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (iBar) iBar.background = RED;
            if (jBar) jBar.background = RED;
          }, index * animationSpeed);

          break;
        }

        case "SWAP_VALUES": {
          const i = animation.index[0];
          const iHeight = animation.index[1];
          const j = animation.index[2];
          const jHeight = animation.index[3];
          const iBar = barRef.current[i]?.style;
          const jBar = barRef.current[j]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (iBar) iBar.height = `${iHeight}%`;
            if (jBar) jBar.height = `${jHeight}%`;
          }, index * animationSpeed);

          break;
        }

        case "SWAP_DONE": {
          const i = animation.index[0];
          const j = animation.index[1];
          const iBar = barRef.current[i]?.style;
          const jBar = barRef.current[j]?.style;
          const nextiBar = barRef.current[i + 1]?.style;
          const nextjBar = barRef.current[j - 1]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (iBar) iBar.background = SECONDARY_COLOR;
            if (jBar) jBar.background = SECONDARY_COLOR;
            if (nextiBar) nextiBar.background = GREEN;
            if (nextjBar) nextjBar.background = GREEN;
          }, index * animationSpeed);

          break;
        }

        case "SWAP_PIVOT": {
          const pivot = animation.index[0];
          const j = animation.index[1];
          const i = animation.index[2];
          const pivotBar = barRef.current[pivot]?.style;
          const jBar = barRef.current[j]?.style;
          const iBar = barRef.current[i]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (pivotBar) pivotBar.background = RED;
            if (jBar) jBar.background = RED;
            if (iBar) iBar.background = SECONDARY_COLOR;
          }, index * animationSpeed);

          break;
        }

        case "SWAP_PIVOT_DONE": {
          const pivot = animation.index[0];
          const j = animation.index[1];
          const pivotBar = barRef.current[pivot]?.style;
          const jBar = barRef.current[j]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (pivotBar) pivotBar.background = SECONDARY_COLOR;
            if (jBar) jBar.background = SECONDARY_COLOR;
          }, index * animationSpeed);

          break;
        }

        default:
          break;
      }
    });

    timeouts.current[animations.length + 1] = setTimeout(() => {
      dispatch(visualizationComplete());
    }, animations.length * animationSpeed);
  }, [array, YELLOW, GREEN, RED, SECONDARY_COLOR, animationSpeed, dispatch]);

  const mergeSortRun = useCallback(() => {
    const animations = mergeSort(array);
    timeouts.current = new Array(animations.length + 1);

    animations.forEach((animation, index) => {
      switch (animation.action) {
        case "SAVE_VALUE": {
          const i = animation.index[0];
          const iBar = barRef.current[i]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (iBar) iBar.background = PRIMARY_COLOR;
          }, index * animationSpeed);

          break;
        }

        case "UPDATE_PARTITION": {
          const i = animation.index[0];
          const iHeight = animation.index[1];
          const iBar = barRef.current[i]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (iBar) {
              iBar.background = SECONDARY_COLOR;
              iBar.height = `${iHeight}%`;
            }
          }, index * animationSpeed);

          break;
        }

        default:
          break;
      }
    });

    timeouts.current[animations.length + 1] = setTimeout(() => {
      dispatch(visualizationComplete());
    }, animations.length * animationSpeed);
  }, [array, animationSpeed, PRIMARY_COLOR, SECONDARY_COLOR, dispatch]);

  useEffect(() => {
    if (state.visualizer.isRunning) {
      console.log("animation Running");

      if (pathname.split("/")[2] === QUICK_SORT) {
        quickSortRun();
      } else if (pathname.split("/")[2] === MERGE_SORT) {
        mergeSortRun();
      }
    }
  }, [state.visualizer.isRunning, pathname, quickSortRun, mergeSortRun]);

  useEffect(() => {
    resetArray();
  }, [state.visualizer.resetToggle, resetArray]);

  useEffect(() => {
    dispatch(resetVisualizer());
  }, [state.options.size, resetArray, dispatch, pathname]);

  // const testSortingAlgorithm = (): void => {
  //   for (let i = 0; i < 100; i++) {
  //     const testArray: ArrayNumber[] = [];
  //     const length = randomNumberInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       testArray.push({
  //         id: uuidv4(),
  //         value: randomNumberInterval(-1000, 1000),
  //       });
  //     }

  //     const javascriptSortedArray = testArray
  //       .map((nb) => nb.value)
  //       .slice()
  //       .sort((a, b) => a - b);
  //     mergeSort(testArray);

  //     console.log(arraysAreEqual(javascriptSortedArray, testArray));
  //   }
  // }

  return (
    <>
      <Box
        height="80vh"
        width="95vw"
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        mb="5vh"
        mx="auto"
      >
        {array.map((nb, i) => (
          <div
            ref={(el) => (barRef.current[i] = el)}
            className={classes.bar}
            key={nb.id}
            style={{ height: `${nb.value}%`, width: `${width}%` }}
          ></div>
        ))}
      </Box>
      {/* <button onClick={resetArray}>Generate a new array</button>
      <button onClick={mergeSortRun}>merge sort</button> */}
      {/* <button onClick={testSortingAlgorithm}>test</button> */}
      <button onClick={testTSM}>test tsm</button>
    </>
  );
};

// const arraysAreEqual = (
//   arrayOne: number[],
//   arrayTwo: ArrayNumber[]
// ): boolean => {
//   if (arrayOne.length !== arrayTwo.length) return false;

//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i].value) return false;
//   }

//   return true;
// };

export default SortingVisualizer;
