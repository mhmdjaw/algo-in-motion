import React, { ChangeEvent } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Box, CssBaseline } from "@material-ui/core";
import useOptionsStyles from "./options-styles";
import { OptionsState } from "../../redux/options/options-types";
import { useDispatch, useSelector } from "react-redux";
import { changeSize, changeSpeed, changeNodes, changeEdges } from "../../redux";
import { VisualizerState } from "../../redux/visualizer/visualizer-types";
import { useParams } from "react-router-dom";
import {
  BFS,
  DFS,
  MERGE_SORT,
  QUICK_SORT,
} from "../../algorithms/algorithm-types";

interface rootState {
  options: OptionsState;
  visualizer: VisualizerState;
}

const sizeAlgorithms = [QUICK_SORT, MERGE_SORT];
const nodesAlgorithms = [BFS, DFS];
const edgesAlgorithms = [BFS, DFS];

const Options: React.FC = () => {
  const classes = useOptionsStyles();
  const state = useSelector((state: rootState) => state);
  const { algorithm } = useParams<{ algorithm: string }>();
  const dispatch = useDispatch();

  const size = sizeAlgorithms.some((algo) => algo === algorithm);
  const nodes = nodesAlgorithms.some((algo) => algo === algorithm);
  const edges = edgesAlgorithms.some((algo) => algo === algorithm);

  const handleChange = (name: string) => (
    event: ChangeEvent<Record<string, unknown>>,
    newValue: number | number[]
  ) => {
    const value = newValue as number;

    switch (name) {
      case "size":
        dispatch(changeSize(value));
        break;

      case "nodes":
        dispatch(changeNodes(value));
        break;

      case "edges":
        dispatch(changeEdges(value));
        break;

      case "speed":
        dispatch(changeSpeed(value));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        width="95vw"
        justifyContent="space-around"
        mx="auto"
        my="10vh"
      >
        {/* <Box width="20%" display="flex" alignItems="center">
          <Typography className={classes.typographyItems} variant="body2">
            NODES
          </Typography>
          <Slider
            className={classes.sliderItems}
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Box> */}
        {size && (
          <Box width="20%" display="flex" alignItems="center">
            <Typography className={classes.typographyItems} variant="body2">
              SIZE
            </Typography>
            <Slider
              className={classes.sliderItems}
              max={310}
              min={5}
              value={state.options.size}
              onChange={handleChange("size")}
              aria-labelledby="size-slider"
            />
          </Box>
        )}
        {nodes && (
          <Box width="20%" display="flex" alignItems="center">
            <Typography className={classes.typographyItems} variant="body2">
              NODES
            </Typography>
            <Slider
              className={classes.sliderItems}
              value={state.options.nodes}
              onChange={handleChange("nodes")}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={3}
              max={40}
              aria-labelledby="nodes-slider"
            />
          </Box>
        )}
        {edges && (
          <Box width="20%" display="flex" alignItems="center">
            <Typography className={classes.typographyItems} variant="body2">
              EDGES
            </Typography>
            <Slider
              className={classes.sliderItems}
              value={state.options.edges}
              onChange={handleChange("edges")}
              aria-labelledby="edges-slider"
            />
          </Box>
        )}
        <Box width="20%" display="flex" alignItems="center">
          <Typography className={classes.typographyItems} variant="body2">
            SPEED
          </Typography>
          <Slider
            className={classes.sliderItems}
            value={state.options.speed}
            onChange={handleChange("speed")}
            disabled={state.visualizer.isRunning}
            aria-labelledby="speed-slider"
          />
        </Box>
      </Box>
    </>
  );
};

export default Options;
