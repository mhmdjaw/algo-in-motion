import React, { useCallback, useEffect, useRef, useState } from "react";
import usePathfindingVisualizerStyles from "./pathfinding-visualizer-styles";
import { Cell } from "./pathfinding-visualizer-types";
import { v4 as uuidv4 } from "uuid";
import mazeGeneration from "../../../algorithms/maze-generation";
import pathfinding from "../../../algorithms/pathfinding";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { VisualizerState } from "../../../redux/visualizer/visualizer-types";
import { OptionsState } from "../../../redux/options/options-types";
import {
  generateVisualizer,
  generationComplete,
  visualizationComplete,
} from "../../../redux";

interface RootState {
  visualizer: VisualizerState;
  options: OptionsState;
}

const PathfindingVisualizer: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const classes = usePathfindingVisualizerStyles();
  const theme = useTheme();
  const color = theme.palette;
  const [PRIMARY_COLOR, SECONDARY_COLOR] = [
    color.primary.main,
    color.secondary.main,
  ];

  const [maze, setMaze] = useState<Array<Array<Cell>>>([]);
  const mazeRef = useRef<Array<Array<HTMLDivElement | null>>>([]);
  const timeouts = useRef<Array<NodeJS.Timeout>>([]);
  const timeoutsChunks = useRef<Array<NodeJS.Timeout>>([]);
  const cellSize = useRef<number>(0);
  const mazeSize = useRef({ rows: 0, cols: 0 });
  const generatedMaze = useRef<Array<Array<number>>>([]);
  const cellColor = useRef<Array<Array<string>>>([]);

  const animationSpeed = (1 - state.options.speed / 100) * 195 + 5;

  const resetMaze = () => {
    timeoutsChunks.current.map((timeout) => clearTimeout(timeout));
    timeouts.current.map((timeout) => clearTimeout(timeout));

    const width = 0.95 * window.innerWidth;
    const height = 0.8 * window.innerHeight;

    let rows = Math.floor((height / width) * 103);
    rows = rows % 2 === 0 ? rows - 1 : rows;
    cellSize.current = height / rows;
    let cols = Math.floor(width / cellSize.current);
    cols = cols % 2 === 0 ? cols - 1 : cols;
    mazeSize.current.rows = rows - 2;
    mazeSize.current.cols = cols - 2;

    rows = mazeSize.current.rows;
    cols = mazeSize.current.cols;

    const newMaze = new Array(rows);
    cellColor.current = new Array(rows);

    for (let i = 0; i < rows; i++) {
      newMaze[i] = new Array(cols);
      cellColor.current[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        newMaze[i][j] = { id: uuidv4(), color: 0 };
        cellColor.current[i][j] = "black";
      }
    }

    mazeRef.current = new Array(rows);

    for (let i = 0; i < rows; i++) {
      mazeRef.current[i] = new Array(cols);
    }

    setMaze(newMaze);
  };

  useEffect(
    () => {
      if (maze.length !== 0) {
        dispatch(generateVisualizer());
        const mazeCopy = maze.slice();
        const animations = mazeGeneration(mazeCopy);

        timeouts.current = new Array(animations.length);
        const chunks = Math.floor(animations.length / 1000);
        timeoutsChunks.current = new Array(chunks + 3);

        for (let t = 0; t < chunks; t++) {
          timeoutsChunks.current[t] = setTimeout(() => {
            timeouts.current = new Array(1000);
            let count = 0;
            for (let index = t * 1000; index < (t + 1) * 1000; index++) {
              const animation = animations[index];
              timeouts.current[count] = setTimeout(() => {
                const { row, col } = animation;
                const cell = mazeRef.current[row][col]?.style;
                if (cell) cell.background = "white";
                cellColor.current[row][col] = "white";
              }, count * animationSpeed);
              count++;
            }
          }, t * 1000 * animationSpeed);
        }

        const lastChunk = animations.length % 1000;
        timeouts.current = new Array(lastChunk);

        //repetitive code to repeat the entire process on the last chunk
        timeoutsChunks.current[chunks] = setTimeout(() => {
          let count = 0;
          for (
            let index = animations.length - lastChunk;
            index < animations.length;
            index++
          ) {
            const animation = animations[index];
            timeouts.current[count] = setTimeout(() => {
              const { row, col } = animation;
              const cell = mazeRef.current[row][col]?.style;
              if (cell) cell.background = "white";
              cellColor.current[row][col] = "white";
            }, count * animationSpeed);
            count++;
          }
        }, chunks * 1000 * animationSpeed);

        timeoutsChunks.current[chunks + 1] = setTimeout(() => {
          //color end cell redd
          const endCell = mazeRef.current[0][mazeSize.current.cols - 1]?.style;
          if (endCell) endCell.background = "red";
          cellColor.current[0][mazeSize.current.cols - 1] = "red";
          // color first cell green
          const startCell =
            mazeRef.current[mazeSize.current.rows - 1][0]?.style;
          if (startCell) startCell.background = "lime";
          cellColor.current[mazeSize.current.rows - 1][0] = "lime";
        }, animations.length * animationSpeed + 5);

        generatedMaze.current = mazeCopy.map((row) =>
          row.map((cell) => cell.color)
        );

        timeoutsChunks.current[chunks + 2] = setTimeout(() => {
          dispatch(generationComplete());
        }, (animations.length + 1) * animationSpeed + 5);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [maze, dispatch]
  );

  const pathfindingRun = useCallback(() => {
    const animations = pathfinding(generatedMaze.current);

    timeouts.current = new Array(animations.length);
    const chunks = Math.floor(animations.length / 1000);
    timeoutsChunks.current = new Array(chunks + 2);

    for (let t = 0; t < chunks; t++) {
      timeoutsChunks.current[t] = setTimeout(() => {
        timeouts.current = new Array(1000);
        let count = 0;
        for (let index = t * 1000; index < (t + 1) * 1000; index++) {
          const animation = animations[index];
          timeouts.current[count] = setTimeout(() => {
            switch (animation.action) {
              case "FIND_TARGET": {
                const { row, col } = animation;
                const cell = mazeRef.current[row][col]?.style;
                if (cell) cell.background = PRIMARY_COLOR;
                cellColor.current[row][col] = PRIMARY_COLOR;
                break;
              }

              case "TARGET_FOUND": {
                const { row, col } = animation;
                const cell = mazeRef.current[row][col]?.style;
                if (cell) cell.background = SECONDARY_COLOR;
                cellColor.current[row][col] = SECONDARY_COLOR;
                break;
              }

              default:
                break;
            }
          }, count * animationSpeed);
          count++;
        }
      }, t * 1000 * animationSpeed);
    }

    const lastChunk = animations.length % 1000;
    timeouts.current = new Array(lastChunk);

    //repetitive code to repeat the entire process on the last chunk
    timeoutsChunks.current[chunks] = setTimeout(() => {
      let count = 0;
      for (
        let index = animations.length - lastChunk;
        index < animations.length;
        index++
      ) {
        const animation = animations[index];
        timeouts.current[count] = setTimeout(() => {
          switch (animation.action) {
            case "FIND_TARGET": {
              const { row, col } = animation;
              const cell = mazeRef.current[row][col]?.style;
              if (cell) cell.background = PRIMARY_COLOR;
              cellColor.current[row][col] = PRIMARY_COLOR;
              break;
            }

            case "TARGET_FOUND": {
              const { row, col } = animation;
              const cell = mazeRef.current[row][col]?.style;
              if (cell) cell.background = SECONDARY_COLOR;
              cellColor.current[row][col] = SECONDARY_COLOR;
              break;
            }

            default:
              break;
          }
        }, count * animationSpeed);
        count++;
      }
    }, chunks * 1000 * animationSpeed);

    timeoutsChunks.current[chunks + 1] = setTimeout(() => {
      dispatch(visualizationComplete());
    }, animations.length * animationSpeed + 5);
  }, [PRIMARY_COLOR, SECONDARY_COLOR, animationSpeed, dispatch]);

  useEffect(() => {
    if (state.visualizer.isRunning) {
      pathfindingRun();
    }
  }, [state.visualizer.isRunning, pathfindingRun]);

  useEffect(() => {
    resetMaze();
  }, [state.visualizer.resetToggle]);

  return (
    <div
      className={classes.grid}
      style={{
        gridTemplateColumns: `repeat(${mazeSize.current.cols}, 0fr)`,
        padding: `${cellSize.current}px`,
        width: `${cellSize.current * (mazeSize.current.cols + 2)}px`,
        height: `${cellSize.current * (mazeSize.current.rows + 2)}px`,
      }}
    >
      {maze.map((row, i) => {
        return row.map((col, j) => {
          return (
            <div
              key={col.id}
              ref={(el) => (mazeRef.current[i][j] = el)}
              style={{
                height: `${cellSize.current}px`,
                width: `${cellSize.current}px`,
                backgroundColor: `${cellColor.current[i][j]}`,
              }}
            ></div>
          );
        });
      })}
    </div>
  );
};

export default PathfindingVisualizer;
