import { Action } from "@reduxjs/toolkit";
import {
  RESET_VISUALIZER,
  RUN_VISUALIZER,
  CHANGE_VISUALIZER,
  VISUALIZATION_COMPLETE,
} from "./visualizer-types";

export const runVisualizer = (): Action => {
  return {
    type: RUN_VISUALIZER,
  };
};

export const resetVisualizer = (): Action => {
  return {
    type: RESET_VISUALIZER,
  };
};

export const changeVisualizer = (): Action => {
  return {
    type: CHANGE_VISUALIZER,
  };
};

export const visualizationComplete = (): Action => {
  return {
    type: VISUALIZATION_COMPLETE,
  };
};
