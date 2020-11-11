import React, { useEffect, useRef, useState } from "react";
import "./SortingVisualizer.css";
import { v4 as uuidv4 } from "uuid";
import { quickSort } from "./quick-sort";
const ANIMATION_SPEED = 5;

export interface arrayNumber {
  id: string;
  value: number;
}

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<Array<arrayNumber>>([]);
  const barRef = useRef<Array<HTMLDivElement | null>>([]);
  const timeouts = useRef<Array<NodeJS.Timeout>>([]);

  const range = 500;
  const totalBarWidths = 90 - ((90 - 50) / 306) * (range - 4);
  const width = totalBarWidths / range;

  useEffect(() => {
    resetArray();
  }, []);

  function resetArray(): void {
    const newArray: Array<arrayNumber> = [];

    for (let i = 0; i < range; i++) {
      newArray.push({ id: uuidv4(), value: randomNumberInterval(2, 100) });
    }

    barRef.current = new Array(newArray.length);
    setArray(newArray);
  }

  function quickSortClick(): void {
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

          setTimeout(() => {
            console.log("animation running");
            if (pivotBar) pivotBar.background = "yellow";
            if (iBar) iBar.background = "lime";
            if (jBar) jBar.background = "lime";
          }, index * ANIMATION_SPEED);

          break;
        }

        case "iterate low": {
          const i = animation.index[0];
          const iBar = barRef.current[i]?.style;
          const nextBar = barRef.current[i + 1]?.style;

          setTimeout(() => {
            if (iBar) iBar.background = "indigo";
            if (nextBar) nextBar.background = "lime";
          }, index * ANIMATION_SPEED);

          break;
        }

        case "iterate high": {
          const j = animation.index[0];
          const jBar = barRef.current[j]?.style;
          const nextBar = barRef.current[j - 1]?.style;

          setTimeout(() => {
            if (jBar) jBar.background = "indigo";
            if (nextBar) nextBar.background = "lime";
          }, index * ANIMATION_SPEED);

          break;
        }

        case "swap color": {
          const i = animation.index[0];
          const j = animation.index[1];
          const iBar = barRef.current[i]?.style;
          const jBar = barRef.current[j]?.style;

          setTimeout(() => {
            if (iBar) iBar.background = "red";
            if (jBar) jBar.background = "red";
          }, index * ANIMATION_SPEED);

          break;
        }

        case "swap values": {
          const i = animation.index[0];
          const iHeight = animation.index[1];
          const j = animation.index[2];
          const jHeight = animation.index[3];
          const iBar = barRef.current[i]?.style;
          const jBar = barRef.current[j]?.style;

          setTimeout(() => {
            if (iBar) iBar.height = `${iHeight}%`;
            if (jBar) jBar.height = `${jHeight}%`;
          }, index * ANIMATION_SPEED);

          break;
        }

        case "swap done": {
          const i = animation.index[0];
          const j = animation.index[1];
          const iBar = barRef.current[i]?.style;
          const jBar = barRef.current[j]?.style;
          const nextiBar = barRef.current[i + 1]?.style;
          const nextjBar = barRef.current[j - 1]?.style;

          setTimeout(() => {
            if (iBar) iBar.background = "indigo";
            if (jBar) jBar.background = "indigo";
            if (nextiBar) nextiBar.background = "lime";
            if (nextjBar) nextjBar.background = "lime";
          }, index * ANIMATION_SPEED);

          break;
        }

        case "swap pivot": {
          const pivot = animation.index[0];
          const j = animation.index[1];
          const i = animation.index[2];
          const pivotBar = barRef.current[pivot]?.style;
          const jBar = barRef.current[j]?.style;
          const iBar = barRef.current[i]?.style;

          setTimeout(() => {
            if (pivotBar) pivotBar.background = "red";
            if (jBar) jBar.background = "red";
            if (iBar) iBar.background = "indigo";
          }, index * ANIMATION_SPEED);

          break;
        }

        case "swap pivot done": {
          const pivot = animation.index[0];
          const j = animation.index[1];
          const pivotBar = barRef.current[pivot]?.style;
          const jBar = barRef.current[j]?.style;

          setTimeout(() => {
            if (pivotBar) pivotBar.background = "indigo";
            if (jBar) jBar.background = "indigo";
          }, index * ANIMATION_SPEED);

          break;
        }

        default:
          break;
      }
    });

    const backgroundColor = barRef.current[0]?.style;
    if (backgroundColor) backgroundColor.background = "red";
  }

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
      <div className="container">
        {array.map((nb, i) => (
          <div
            ref={(el) => (barRef.current[i] = el)}
            className="bar"
            key={nb.id}
            style={{ height: `${nb.value}%`, width: `${width}%` }}
          ></div>
        ))}
      </div>
      <button onClick={resetArray}>Generate a new array</button>
      <button onClick={quickSortClick}>quick sort</button>
      {/* <button onClick={testSortingAlgorithm}>test</button> */}
    </>
  );
};

function randomNumberInterval(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

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
