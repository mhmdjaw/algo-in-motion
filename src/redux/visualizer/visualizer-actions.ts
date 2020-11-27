import {
  RESET_COMPLETE,
  RESET_VISUALIZER,
  RUN_VISUALIZER,
  CHANGE_VISUALIZER,
  VisualizerActionTypes,
} from "./visualizer-types";

export const runVisualizer = (): VisualizerActionTypes => {
  return {
    type: RUN_VISUALIZER,
  };
};

export const resetVisualizer = (): VisualizerActionTypes => {
  return {
    type: RESET_VISUALIZER,
  };
};

export const resetComplete = (): VisualizerActionTypes => {
  return {
    type: RESET_COMPLETE,
  };
};

export const changeVisualizer = (): VisualizerActionTypes => {
  return {
    type: CHANGE_VISUALIZER,
  };
};
