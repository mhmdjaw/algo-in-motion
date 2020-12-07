import React, { useCallback, useEffect, useRef, useState } from "react";
import Konva from "konva";
import { v4 as uuidv4 } from "uuid";
import {
  Cities,
  EdgePosition,
  NodePosition,
} from "../graph-canvas-types/graph-canvas-types";
import { randomNumberInterval } from "../../../heplers";
import { Box, Paper } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Circle, Layer, Line, Stage } from "react-konva";
import { KonvaEventObject } from "konva/types/Node";
import travelingSalesman from "../../../algorithms/traveling-salesman";
import { useDispatch, useSelector } from "react-redux";
import { OptionsState } from "../../../redux/options/options-types";
import { VisualizerState } from "../../../redux/visualizer/visualizer-types";
import {
  resetVisualizer,
  visualizationComplete,
} from "../../../redux/visualizer/visualizer-actions";

interface RootState {
  visualizer: VisualizerState;
  options: OptionsState;
}

const TravelingSalesman: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const theme = useTheme();
  const color = theme.palette;
  const [PRIMARY_COLOR, SECONDARY_COLOR] = [
    color.primary.main,
    color.secondary.main,
  ];

  const [citiesState, setCitiesState] = useState<Cities>({
    cities: [],
    edgesPossibility: [],
    edgesSolution: [],
  });

  const totalCities = state.options.cities;
  const animationSpeed = (1 - state.options.speed / 100) * 481 + 10;

  const edgeSolRef = useRef<Array<Konva.Line | null>>([]);
  const edgePossRef = useRef<Array<Konva.Line | null>>([]);
  const cityRef = useRef<Array<Konva.Circle | null>>([]);
  const initialPos = useRef<Array<NodePosition>>([]);
  const distances = useRef<Array<Array<number>>>([]);
  const layer = useRef<Konva.Layer | null>(null);
  const edgePossPos = useRef<Array<EdgePosition>>([]);
  const edgeSolPos = useRef<Array<EdgePosition>>([]);
  const timeoutsChunks = useRef<Array<NodeJS.Timeout>>([]);
  const timeouts = useRef<Array<NodeJS.Timeout>>([]);

  const resetCities = useCallback(() => {
    timeoutsChunks.current.map((timeout) => clearTimeout(timeout));
    timeouts.current.map((timeout) => clearTimeout(timeout));
    distances.current = new Array(totalCities);
    for (let i = 0; i < totalCities; i++) {
      distances.current[i] = new Array(totalCities);
    }
    initialPos.current = [];
    edgePossPos.current = new Array(totalCities - 1).fill({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    });
    edgeSolPos.current = new Array(totalCities - 1).fill({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    });

    const newCities: Cities = {
      cities: [],
      edgesPossibility: [],
      edgesSolution: [],
    };

    for (let i = 0; i < totalCities; i++) {
      newCities.cities.push(uuidv4());
      initialPos.current.push({
        x: randomNumberInterval(20, 0.95 * window.innerWidth - 20),
        y: randomNumberInterval(20, 0.8 * window.innerHeight - 20),
      });
    }

    for (let i = 0; i < totalCities; i++) {
      for (let j = 0; j < totalCities; j++) {
        const a = initialPos.current[i].x - initialPos.current[j].x;
        const b = initialPos.current[i].y - initialPos.current[j].y;
        distances.current[i][j] = Math.sqrt(a * a + b * b);
      }
    }

    for (let i = 0; i < totalCities - 1; i++) {
      newCities.edgesPossibility.push(uuidv4());
      newCities.edgesSolution.push(uuidv4());
    }

    cityRef.current = new Array(totalCities);
    edgePossRef.current = new Array(totalCities - 1);
    edgeSolRef.current = new Array(totalCities - 1);

    setCitiesState(newCities);
  }, [totalCities]);

  const travelingSalesmanRun = useCallback(() => {
    const animations = travelingSalesman(distances.current);
    timeouts.current = new Array(animations.length);

    const chunks = Math.floor(animations.length / 1500);

    timeoutsChunks.current = new Array(chunks + 2);

    for (let t = 0; t < chunks; t++) {
      timeoutsChunks.current[t] = setTimeout(() => {
        timeouts.current = new Array(1500);
        let count = 0;
        for (let index = t * 1500; index < (t + 1) * 1500; index++) {
          const animation = animations[index];
          switch (animation.action) {
            case "CURRENT_POSSIBILITY": {
              timeouts.current[count] = setTimeout(() => {
                for (let i = 0; i < animation.index.length - 1; i++) {
                  const city = animation.index[i];
                  const nextCity = animation.index[i + 1];
                  const x1 = cityRef.current[city]?.x() as number;
                  const y1 = cityRef.current[city]?.y() as number;
                  const x2 = cityRef.current[nextCity]?.x() as number;
                  const y2 = cityRef.current[nextCity]?.y() as number;
                  edgePossRef.current[i]?.points([x1, y1, x2, y2]);
                  // edgePossPos.current[i] = { x1, y1, x2, y2 };
                  edgePossRef.current[i]?.stroke(SECONDARY_COLOR);
                  layer.current?.draw();
                }
              }, count * animationSpeed);

              break;
            }

            case "CURRENT_SOLUTION": {
              timeouts.current[index] = setTimeout(() => {
                for (let i = 0; i < animation.index.length; i++) {
                  if (i === animation.index.length - 1) {
                    const lastCity = animation.index[i];
                    cityRef.current[lastCity]?.fill(PRIMARY_COLOR);
                    layer.current?.draw();
                    break;
                  }
                  const city = animation.index[i];
                  const nextCity = animation.index[i + 1];
                  const x1 = cityRef.current[city]?.x() as number;
                  const y1 = cityRef.current[city]?.y() as number;
                  const x2 = cityRef.current[nextCity]?.x() as number;
                  const y2 = cityRef.current[nextCity]?.y() as number;
                  edgeSolRef.current[i]?.points([x1, y1, x2, y2]);
                  edgeSolPos.current[i] = { x1, y1, x2, y2 };
                  cityRef.current[city]?.fill(PRIMARY_COLOR);
                  edgeSolRef.current[i]?.stroke(PRIMARY_COLOR);
                }
              }, count * animationSpeed);

              break;
            }

            default:
              break;
          }
          count++;
        }
      }, t * 1500 * animationSpeed);
    }

    const lastChunk = animations.length % 1500;
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
        switch (animation.action) {
          case "CURRENT_POSSIBILITY": {
            timeouts.current[count] = setTimeout(() => {
              for (let i = 0; i < animation.index.length - 1; i++) {
                const city = animation.index[i];
                const nextCity = animation.index[i + 1];
                const x1 = cityRef.current[city]?.x() as number;
                const y1 = cityRef.current[city]?.y() as number;
                const x2 = cityRef.current[nextCity]?.x() as number;
                const y2 = cityRef.current[nextCity]?.y() as number;
                edgePossRef.current[i]?.points([x1, y1, x2, y2]);
                // edgePossPos.current[i] = { x1, y1, x2, y2 };
                edgePossRef.current[i]?.stroke(SECONDARY_COLOR);
                layer.current?.draw();
              }
            }, count * animationSpeed);

            break;
          }

          case "CURRENT_SOLUTION": {
            timeouts.current[index] = setTimeout(() => {
              for (let i = 0; i < animation.index.length; i++) {
                if (i === animation.index.length - 1) {
                  const lastCity = animation.index[i];
                  cityRef.current[lastCity]?.fill(PRIMARY_COLOR);
                  layer.current?.draw();
                  break;
                }
                const city = animation.index[i];
                const nextCity = animation.index[i + 1];
                const x1 = cityRef.current[city]?.x() as number;
                const y1 = cityRef.current[city]?.y() as number;
                const x2 = cityRef.current[nextCity]?.x() as number;
                const y2 = cityRef.current[nextCity]?.y() as number;
                edgeSolRef.current[i]?.points([x1, y1, x2, y2]);
                edgeSolPos.current[i] = { x1, y1, x2, y2 };
                cityRef.current[city]?.fill(PRIMARY_COLOR);
                edgeSolRef.current[i]?.stroke(PRIMARY_COLOR);
              }
            }, count * animationSpeed);

            break;
          }

          default:
            break;
        }
        count++;
      }
    }, chunks * 1500 * animationSpeed);

    timeoutsChunks.current[chunks + 1] = setTimeout(() => {
      dispatch(visualizationComplete());
    }, animations.length * animationSpeed);
  }, [PRIMARY_COLOR, SECONDARY_COLOR, animationSpeed, dispatch]);

  useEffect(() => {
    if (state.visualizer.isRunning) {
      travelingSalesmanRun();
    }
  }, [state.visualizer.isRunning, travelingSalesmanRun]);

  useEffect(() => {
    resetCities();
  }, [state.visualizer.resetToggle, resetCities]);

  useEffect(() => {
    dispatch(resetVisualizer());
  }, [dispatch, totalCities]);

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    let newX = e.target.x();
    let newY = e.target.y();
    const city = Number(e.target.id());
    const currentCity = cityRef.current[city];

    // drag boundaries
    if (newX < 20) {
      currentCity?.x(20);
      newX = 20;
    }
    if (newX > 0.95 * window.innerWidth - 20) {
      currentCity?.x(0.95 * window.innerWidth - 20);
      newX = 0.95 * window.innerWidth - 20;
    }
    if (newY < 20) {
      currentCity?.y(20);
      newY = 20;
    }
    if (newY > 0.8 * window.innerHeight - 20) {
      currentCity?.y(0.8 * window.innerHeight - 20);
      newY = 0.8 * window.innerHeight - 20;
    }

    // update initial position to save it on rerender
    initialPos.current[city].x = newX;
    initialPos.current[city].y = newY;

    // update the distance to all other cities
    distances.current[city].forEach((_, i) => {
      if (city !== i) {
        const a = initialPos.current[city].x - initialPos.current[i].x;
        const b = initialPos.current[city].y - initialPos.current[i].y;
        const distance = Math.sqrt(a * a + b * b);
        distances.current[city][i] = distances.current[i][city] = distance;
      }
    });
  };

  return (
    <Box
      height={0.8 * window.innerHeight}
      width={0.95 * window.innerWidth}
      mx="auto"
    >
      <Paper>
        <Stage
          height={0.8 * window.innerHeight}
          width={0.95 * window.innerWidth}
        >
          <Layer ref={layer}>
            {citiesState.edgesPossibility.map((id, i) => {
              const { x1, y1, x2, y2 } = edgePossPos.current[i];
              return (
                <Line
                  key={id}
                  ref={(el) => (edgePossRef.current[i] = el)}
                  x={0}
                  y={0}
                  points={[x1, y1, x2, y2]}
                  stroke="white"
                />
              );
            })}

            {citiesState.edgesSolution.map((id, i) => {
              const { x1, y1, x2, y2 } = edgeSolPos.current[i];
              return (
                <Line
                  key={id}
                  ref={(el) => (edgeSolRef.current[i] = el)}
                  x={0}
                  y={0}
                  points={[x1, y1, x2, y2]}
                  stroke="white"
                />
              );
            })}

            {citiesState.cities.map((id, i) => (
              <Circle
                key={id}
                id={`${i}`}
                ref={(el) => (cityRef.current[i] = el)}
                x={initialPos.current[i].x}
                y={initialPos.current[i].y}
                radius={20}
                fill="white"
                draggable={
                  !state.visualizer.isRunning && !state.visualizer.isComplete
                }
                onDragMove={handleDragMove}
              />
            ))}
          </Layer>
        </Stage>
      </Paper>
    </Box>
  );
};

export default TravelingSalesman;
