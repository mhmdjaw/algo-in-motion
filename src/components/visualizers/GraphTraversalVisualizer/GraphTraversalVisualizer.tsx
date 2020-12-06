import { Box, Paper } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Konva from "konva";
import { KonvaEventObject } from "konva/types/Node";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle, Line } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { randomNumberInterval } from "../../../heplers";
import { OptionsState } from "../../../redux/options/options-types";
import { VisualizerState } from "../../../redux/visualizer/visualizer-types";
import { Edge, NodePosition, Graph } from "../graph-canvas-types";
import {
  resetVisualizer,
  visualizationComplete,
} from "../../../redux/visualizer/visualizer-actions";
import { BFS, DFS } from "../../../algorithms/algorithm-types";
import bfs from "../../../algorithms/bfs";
import dfs from "../../../algorithms/dfs";

interface RootState {
  visualizer: VisualizerState;
  options: OptionsState;
}

const GraphTraversalVisualizer: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const theme = useTheme();
  const color = theme.palette;
  const [PRIMARY_COLOR, SECONDARY_COLOR] = [
    color.primary.main,
    color.secondary.main,
  ];

  const numberOfNodes = state.options.nodes;
  const maxNumberOfEdges = (numberOfNodes * (numberOfNodes - 1)) / 2;
  const minNumberOfEdges = numberOfNodes - 1;
  const numberOfEdges =
    Math.floor(
      (state.options.edges / 100) * (maxNumberOfEdges - minNumberOfEdges)
    ) + minNumberOfEdges;
  const animationSpeed = (1 - state.options.speed / 100) * 900 + 100;

  const [graphState, setGraphState] = useState<Graph>({ graph: [], edges: [] });

  const edgeRef = useRef<Array<Array<Konva.Line | null>>>([]); //double array
  const nodeRef = useRef<Array<Konva.Circle | null>>([]);
  const initialPos = useRef<Array<NodePosition>>([]);
  const layer = useRef<Konva.Layer | null>(null);
  const timeouts = useRef<Array<NodeJS.Timeout>>([]);

  const generateEdges = useCallback(() => {
    const newEdges: Edge[] = [];
    const allPossibleEdges: Edge[] = [];
    const availableEdges = new Array(
      (numberOfNodes * (numberOfNodes - 1)) / 2
    ).fill(true);

    for (let i = 0; i < numberOfNodes; i++) {
      for (let j = i + 1; j < numberOfNodes; j++) {
        allPossibleEdges.push({ id: uuidv4(), from: i, to: j });
      }
    }

    for (let i = 1; i < numberOfNodes; i++) {
      const j = randomNumberInterval(0, i - 1);

      newEdges.push({ id: uuidv4(), from: j, to: i });

      const index = mapEdgesToIndices(j, i, numberOfNodes);

      availableEdges[index] = false;
    }

    for (let i = 0; i < numberOfEdges - (numberOfNodes - 1); i++) {
      const availableEdgesIndices: number[] = [];
      availableEdges.forEach(
        (available, index) => available && availableEdgesIndices.push(index)
      );

      const randomIndex = randomNumberInterval(
        0,
        availableEdgesIndices.length - 1
      );

      const chosenAvailableEdgeIndex = availableEdgesIndices[randomIndex];

      availableEdges[chosenAvailableEdgeIndex] = false;

      newEdges.push(allPossibleEdges[chosenAvailableEdgeIndex]);
    }

    return newEdges;
  }, [numberOfNodes, numberOfEdges]);

  const resetGraph = useCallback(() => {
    timeouts.current.map((timeout) => clearTimeout(timeout));
    initialPos.current = [];

    const newGraph: Graph = { graph: [], edges: [] };

    for (let i = 0; i < numberOfNodes; i++) {
      newGraph.graph.push({ id: uuidv4(), neighbor: [] });
      initialPos.current.push({
        x: randomNumberInterval(20, 0.95 * window.innerWidth - 20),
        y: randomNumberInterval(20, 0.8 * window.innerHeight - 20),
      });
    }

    newGraph.edges = generateEdges();

    for (let i = 0; i < newGraph.edges.length; i++) {
      newGraph.graph[newGraph.edges[i].from].neighbor.push(
        newGraph.edges[i].to
      );
      newGraph.graph[newGraph.edges[i].to].neighbor.push(
        newGraph.edges[i].from
      );
    }

    edgeRef.current = new Array(40);
    for (let i = 0; i < 40; i++) {
      edgeRef.current[i] = new Array(40);
    }
    nodeRef.current = new Array(newGraph.graph.length);

    setGraphState(newGraph);
  }, [generateEdges, numberOfNodes]);

  const BFSRun = useCallback(() => {
    const animations = bfs(graphState.graph);
    timeouts.current = new Array(animations.length + 1);

    animations.forEach((animation, index) => {
      switch (animation.action) {
        case "VISIT_NODE": {
          const i = animation.index[0];

          timeouts.current[index] = setTimeout(() => {
            nodeRef.current[i]?.fill(PRIMARY_COLOR);
            layer.current?.draw();
          }, index * animationSpeed);

          break;
        }

        case "VISIT_EDGE": {
          const from = animation.index[0];
          const to = animation.index[1];

          timeouts.current[index] = setTimeout(() => {
            edgeRef.current[from][to]?.stroke(PRIMARY_COLOR);
            layer.current?.draw();
          }, index * animationSpeed);

          break;
        }

        case "DEQUEUE_NODE": {
          const i = animation.index[0];

          timeouts.current[index] = setTimeout(() => {
            nodeRef.current[i]?.fill(SECONDARY_COLOR);
            layer.current?.draw();
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
  }, [
    graphState.graph,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    animationSpeed,
    dispatch,
  ]);

  const DFSRun = useCallback(() => {
    const animations = dfs(graphState.graph);
    timeouts.current = new Array(animations.length + 1);

    animations.forEach((animation, index) => {
      switch (animation.action) {
        case "VISIT_NODE": {
          const i = animation.index[0];

          timeouts.current[index] = setTimeout(() => {
            nodeRef.current[i]?.fill(PRIMARY_COLOR);
            layer.current?.draw();
          }, index * animationSpeed);

          break;
        }

        case "VISIT_EDGE": {
          const from = animation.index[0];
          const to = animation.index[1];
          const edge = edgeRef.current[from][to];

          timeouts.current[index] = setTimeout(() => {
            if (edge) edge.stroke(PRIMARY_COLOR);
            layer.current?.draw();
          }, index * animationSpeed);

          break;
        }

        case "BACKTRACK_EDGE": {
          const from = animation.index[0];
          const to = animation.index[1];

          timeouts.current[index] = setTimeout(() => {
            edgeRef.current[from][to]?.stroke(SECONDARY_COLOR);
            layer.current?.draw();
          }, index * animationSpeed);

          break;
        }

        case "BACKTRACK_NODE": {
          const i = animation.index[0];

          timeouts.current[index] = setTimeout(() => {
            nodeRef.current[i]?.fill(SECONDARY_COLOR);
            layer.current?.draw();
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
  }, [
    graphState.graph,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    animationSpeed,
    dispatch,
  ]);

  useEffect(() => {
    if (state.visualizer.isRunning) {
      if (pathname.split("/")[2] === BFS) {
        BFSRun();
      } else if (pathname.split("/")[2] === DFS) {
        DFSRun();
      }
    }
  }, [state.visualizer.isRunning, pathname, BFSRun, DFSRun]);

  useEffect(() => {
    resetGraph();
  }, [state.visualizer.resetToggle, resetGraph]);

  useEffect(() => {
    dispatch(resetVisualizer());
  }, [dispatch, pathname, numberOfNodes, numberOfEdges, resetGraph]);

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    let newX = e.target.x();
    let newY = e.target.y();
    const node = Number(e.target.id());
    const currentNode = nodeRef.current[node];

    // drag boundaries
    if (newX < 20) {
      currentNode?.x(20);
      newX = 20;
    }
    if (newX > 0.95 * window.innerWidth - 20) {
      currentNode?.x(0.95 * window.innerWidth - 20);
      newX = 0.95 * window.innerWidth - 20;
    }
    if (newY < 20) {
      currentNode?.y(20);
      newY = 20;
    }
    if (newY > 0.8 * window.innerHeight - 20) {
      currentNode?.y(0.8 * window.innerHeight - 20);
      newY = 0.8 * window.innerHeight - 20;
    }

    // update initial position to save it on rerender
    initialPos.current[node].x = newX;
    initialPos.current[node].y = newY;

    // update all edges positions linked to this node
    graphState.graph[node].neighbor.forEach((neighbor) => {
      const edge = edgeRef.current[node][neighbor];
      if (edge) {
        const points = edge.points();
        if (Number(edge.name()) === node) {
          edge.points([newX, newY, points[2], points[3]]);
        } else if (Number(edge.name()) === neighbor) {
          edge.points([points[0], points[1], newX, newY]);
        }
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
            {graphState.edges.map((edge) => (
              <Line
                key={edge.id}
                ref={(el) =>
                  (edgeRef.current[edge.from][edge.to] = edgeRef.current[
                    edge.to
                  ][edge.from] = el)
                }
                name={`${edge.from}`}
                x={0} //nodeRef.current[edge.from].x()}
                y={0}
                points={[
                  initialPos.current[edge.from].x,
                  initialPos.current[edge.from].y,
                  initialPos.current[edge.to].x,
                  initialPos.current[edge.to].y,
                ]}
                stroke="white"
              />
            ))}

            {graphState.graph.map((node, i) => (
              <Circle
                key={node.id}
                id={`${i}`}
                ref={(el) => (nodeRef.current[i] = el)}
                x={initialPos.current[i].x}
                y={initialPos.current[i].y}
                radius={20}
                fill="white"
                draggable
                onDragMove={handleDragMove}
              />
            ))}
          </Layer>
        </Stage>
      </Paper>
    </Box>
  );
};

const mapEdgesToIndices = (from: number, to: number, numberOfNodes: number) => {
  const index =
    from * numberOfNodes - ((from * (from + 1)) / 2 + 1) + (to - from);
  return index;
};

export default GraphTraversalVisualizer;
