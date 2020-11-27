import { Action } from "../action";
import {
  RESET_COMPLETE,
  RESET_VISUALIZER,
  RUN_VISUALIZER,
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
