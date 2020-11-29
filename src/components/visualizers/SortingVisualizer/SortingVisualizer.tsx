import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { quickSort } from "../../../algorithms/quick-sort";
import { useTheme } from "@material-ui/core/styles";
import { ArrayNumber } from "./sorting-visualizer-array";
import { Box } from "@material-ui/core";
import useSortingVisualizerStyles from "./sorting-visualizer-styles";
import { useDispatch, useSelector } from "react-redux";
import {
  resetComplete,
  resetVisualizer,
} from "../../../redux/visualizer/visualizer-actions";
import { VisualizerState } from "../../../redux/visualizer/visualizer-types";
import { OptionsState } from "../../../redux/options/options-types";
import { useLocation } from "react-router-dom";
import { QUICK_SORT } from "../../../algorithms/algorithm-types";

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
  const [secondaryColor, yellow, red, green] = [
    color.secondary.main,
    "yellow",
    "red",
    "lime",
  ];

  const animationSpeed =
    (1 - state.options.speed / 100) *
      (3 + (1 - state.options.size / 310) * 310) +
    5;
  console.log(animationSpeed);

  const range = state.options.size;
  const totalBarWidths = 90 - ((90 - 50) / 306) * (range - 4);
  const width = totalBarWidths / range;

  const resetArray = useCallback(() => {
    dispatch(resetComplete());
    const newArray: Array<ArrayNumber> = [];

    for (let i = 0; i < range; i++) {
      newArray.push({
        id: uuidv4(),
        value: (randomNumberInterval(4, 200) / 200) * 100,
      });
    }

    barRef.current = new Array(newArray.length);
    timeouts.current.map((timeout) => clearTimeout(timeout));
    setArray(newArray);
  }, [dispatch, range]);

  const quickSortRun = useCallback(() => {
    const animations = quickSort(array);
    timeouts.current = new Array(animations.length);

    animations.forEach((animation, index) => {
      switch (animation.action) {
        case "pivot": {
          const pivot = animation.index[0];
          const i = animation.index[1];
          const j = animation.index[2];
          const pivotBar = barRef.current[pivot]?.style;
          const iBar = barRef.current[i]?.style;
          const jBar = barRef.current[j]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (pivotBar) pivotBar.background = yellow;
            if (iBar) iBar.background = green;
            if (jBar) jBar.background = green;
          }, index * animationSpeed);

          break;
        }

        case "iterate low": {
          const i = animation.index[0];
          const iBar = barRef.current[i]?.style;
          const nextBar = barRef.current[i + 1]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (iBar) iBar.background = secondaryColor;
            if (nextBar) nextBar.background = green;
          }, index * animationSpeed);

          break;
        }

        case "iterate high": {
          const j = animation.index[0];
          const jBar = barRef.current[j]?.style;
          const nextBar = barRef.current[j - 1]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (jBar) jBar.background = secondaryColor;
            if (nextBar) nextBar.background = green;
          }, index * animationSpeed);

          break;
        }

        case "swap color": {
          const i = animation.index[0];
          const j = animation.index[1];
          const iBar = barRef.current[i]?.style;
          const jBar = barRef.current[j]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (iBar) iBar.background = red;
            if (jBar) jBar.background = red;
          }, index * animationSpeed);

          break;
        }

        case "swap values": {
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

        case "swap done": {
          const i = animation.index[0];
          const j = animation.index[1];
          const iBar = barRef.current[i]?.style;
          const jBar = barRef.current[j]?.style;
          const nextiBar = barRef.current[i + 1]?.style;
          const nextjBar = barRef.current[j - 1]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (iBar) iBar.background = secondaryColor;
            if (jBar) jBar.background = secondaryColor;
            if (nextiBar) nextiBar.background = green;
            if (nextjBar) nextjBar.background = green;
          }, index * animationSpeed);

          break;
        }

        case "swap pivot": {
          const pivot = animation.index[0];
          const j = animation.index[1];
          const i = animation.index[2];
          const pivotBar = barRef.current[pivot]?.style;
          const jBar = barRef.current[j]?.style;
          const iBar = barRef.current[i]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (pivotBar) pivotBar.background = red;
            if (jBar) jBar.background = red;
            if (iBar) iBar.background = secondaryColor;
          }, index * animationSpeed);

          break;
        }

        case "swap pivot done": {
          const pivot = animation.index[0];
          const j = animation.index[1];
          const pivotBar = barRef.current[pivot]?.style;
          const jBar = barRef.current[j]?.style;

          timeouts.current[index] = setTimeout(() => {
            if (pivotBar) pivotBar.background = secondaryColor;
            if (jBar) jBar.background = secondaryColor;
          }, index * animationSpeed);

          break;
        }

        default:
          break;
      }
    });
  }, [array, yellow, green, red, secondaryColor, animationSpeed]);

  useEffect(() => {
    if (state.visualizer.isResetting) {
      resetArray();
    }
    if (state.visualizer.isRunning) {
      if (pathname.split("/")[2] === QUICK_SORT) {
        quickSortRun();
      }
    }
  }, [
    state.visualizer.isRunning,
    state.visualizer.isResetting,
    pathname,
    quickSortRun,
    resetArray,
  ]);

  useEffect(() => {
    dispatch(resetVisualizer());
  }, [state.options.size, resetArray, dispatch]);

  // function testSortingAlgorithm(): void {
  //   for (let i = 0; i < 100; i++) {
  //     const testArray: arrayNumber[] = [];
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
  //     quickSort(testArray);

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
      <button onClick={quickSortClick}>quick sort</button> */}
      {/* <button onClick={testSortingAlgorithm}>test</button> */}
    </>
  );
};

const randomNumberInterval = (from: number, to: number): number => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

// const arraysAreEqual = (
//   arrayOne: Array<number>,
//   arrayTwo: Array<arrayNumber>
// ): boolean => {
//   if (arrayOne.length !== arrayTwo.length) return false;

//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i].value) return false;
//   }

//   return true;
// };

export default SortingVisualizer;
