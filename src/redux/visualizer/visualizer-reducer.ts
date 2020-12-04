import { Action } from "@reduxjs/toolkit";
import {
  RESET_VISUALIZER,
  RUN_VISUALIZER,
  CHANGE_VISUALIZER,
  VisualizerState,
  VISUALIZATION_COMPLETE,
} from "./visualizer-types";

const initialState: VisualizerState = {
  isRunning: false,
  isGenerated: true,
  resetToggle: false,
  isComplete: false,
};

const visualizerReducer = (
  state = initialState,
  action: Action
): VisualizerState => {
  switch (action.type) {
    case RUN_VISUALIZER:
      return {
        ...state,
        isRunning: true,
      };
    case RESET_VISUALIZER:
      return {
        ...state,
        resetToggle: !state.resetToggle,
        isRunning: false,
        isComplete: false,
      };

    case CHANGE_VISUALIZER:
      return {
        ...state,
        isRunning: false,
        isComplete: false,
      };

    case VISUALIZATION_COMPLETE:
      return {
        ...state,
        isComplete: true,
        isRunning: false,
      };
    default:
      return state;
  }
};

export default visualizerReducer;
