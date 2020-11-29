import { Action } from "@reduxjs/toolkit";
import {
  RESET_COMPLETE,
  RESET_VISUALIZER,
  RUN_VISUALIZER,
  CHANGE_VISUALIZER,
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

export const resetComplete = (): Action => {
  return {
    type: RESET_COMPLETE,
  };
};

export const changeVisualizer = (): Action => {
  return {
    type: CHANGE_VISUALIZER,
  };
};
