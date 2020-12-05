import Konva from "konva";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { Point, Position } from "./times-tables-visualizer-types";
import { v4 as uuidv4 } from "uuid";
import { getGradientColor } from "../../../heplers";
import { VisualizerState } from "../../../redux/visualizer/visualizer-types";
import { OptionsState } from "../../../redux/options/options-types";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { resetVisualizer } from "../../../redux";
import { visualizationComplete } from "../../../redux/visualizer/visualizer-actions";
import { Box } from "@material-ui/core";

interface RootState {
  visualizer: VisualizerState;
  options: OptionsState;
}

const getPosition = (
  index: number,
  delta: number,
  height: number,
  width: number
): Position => {
  const angle = index * delta;
  const radius = 0.85 * (Math.min(height, width) / 2);
  const xpos = radius * Math.cos(angle);
  const ypos = radius * Math.sin(angle);
  return { x: xpos, y: ypos };
};

const TimesTablesVisualizer: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const theme = useTheme();
  const color = theme.palette;
  const [PRIMARY_COLOR, SECONDARY_COLOR] = [
    color.primary.main,
    color.secondary.main,
  ];

  const line = useRef<Array<Konva.Line | null>>([]);
  const [points, setPoints] = useState<Array<Point>>([]);
  const positionsTo = useRef<Array<Position>>([]);
  const colors = useRef<Array<string>>([]);
  const layer = useRef<Konva.Layer | null>(null);
  const timeoutsChunks = useRef<Array<NodeJS.Timeout>>([]);
  const timeouts = useRef<Array<NodeJS.Timeout>>([]);

  const WIDTH = 0.95 * window.innerWidth;
  const HEIGHT = 0.8 * window.innerHeight;

  const total = state.options.points;
  const delta = (2 * Math.PI) / total;
  const initialFactor = 0;
  const animationSpeed = (1 - state.options.speed / 100) * 490 + 10;

  const timesTablesRun = useCallback(() => {
    timeoutsChunks.current = new Array(120);
    timeouts.current = new Array(1000);
    for (let t = 0; t < 120; t++) {
      timeoutsChunks.current[t] = setTimeout(() => {
        let i = 0;
        timeouts.current = new Array(1000);
        for (let factor = t * 10; factor < (t + 1) * 10; factor += 0.01) {
          timeouts.current[i++] = setTimeout(() => {
            for (let j = 0; j < total; j++) {
              const currentLine = line.current[j];
              const position = getPosition(
                (factor * j) % total,
                delta,
                HEIGHT,
                WIDTH
              );
              currentLine?.points([
                points[j].position.x,
                points[j].position.y,
                position.x,
                position.y,
              ]);
            }
            layer.current?.draw();
          }, (factor - t * 10) * 100 * animationSpeed);
        }
      }, t * 10 * 100 * animationSpeed);
    }

    timeoutsChunks.current[121] = setTimeout(() => {
      dispatch(visualizationComplete());
    }, 120 * 10 * 100 * animationSpeed);
  }, [animationSpeed, delta, points, total, HEIGHT, WIDTH, dispatch]);

  const resetTimesTables = useCallback(() => {
    timeoutsChunks.current.map((timeout) => clearTimeout(timeout));
    timeouts.current.map((timeout) => clearTimeout(timeout));
    line.current = Array(total);

    const newPositions: Point[] = [];
    positionsTo.current = [];
    for (let i = 0; i < total; i++) {
      newPositions.push({
        id: uuidv4(),
        position: getPosition(i, delta, HEIGHT, WIDTH),
      });
    }

    for (let i = 0; i < total; i++) {
      positionsTo.current.push(
        getPosition((i * initialFactor) % total, delta, HEIGHT, WIDTH)
      );
    }

    colors.current = [];

    // generate colors for each line
    for (let i = 0; i < total; i++) {
      const color = getGradientColor(PRIMARY_COLOR, SECONDARY_COLOR, i / total);
      colors.current.push(color);
    }

    setPoints(newPositions);
  }, [delta, total, PRIMARY_COLOR, HEIGHT, WIDTH, SECONDARY_COLOR]);

  useEffect(
    () => {
      if (state.visualizer.isRunning) {
        timesTablesRun();
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.visualizer.isRunning]
  );

  useEffect(() => {
    resetTimesTables();
  }, [state.visualizer.resetToggle, resetTimesTables]);

  useEffect(() => {
    dispatch(resetVisualizer());
  }, [dispatch, total]);

  return (
    <Box height={HEIGHT} width={WIDTH} mx="auto">
      <Stage width={WIDTH} height={HEIGHT}>
        <Layer ref={layer}>
          {points.map((point, i) => (
            <Line
              key={point.id}
              ref={(el) => (line.current[i] = el)}
              strokeWidth={1}
              scaleX={-1}
              scaleY={-1}
              x={WIDTH / 2}
              y={HEIGHT / 2}
              points={[
                point.position.x,
                point.position.y,
                positionsTo.current[i].x,
                positionsTo.current[i].y,
              ]}
              stroke={colors.current[i]}
            />
            // <Circle x={position.x} y={position.y} radius={5} fill="green" />
          ))}
        </Layer>
      </Stage>
    </Box>
  );
};

export default TimesTablesVisualizer;
