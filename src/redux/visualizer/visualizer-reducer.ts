import {
  RESET_COMPLETE,
  RESET_VISUALIZER,
  RUN_VISUALIZER,
  CHANGE_VISUALIZER,
  VisualizerActionTypes,
  VisualizerState,
} from "./visualizer-types";

const initialState: VisualizerState = {
  isRunning: false,
  isGenerated: true,
  isResetting: true,
};

const visualizerReducer = (
  state = initialState,
  action: VisualizerActionTypes
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
        isResetting: true,
        isRunning: false,
      };
    case RESET_COMPLETE:
      return {
        ...state,
        isResetting: false,
      };
    case CHANGE_VISUALIZER:
      return {
        ...state,
        isRunning: false,
      };
    default:
      return state;
  }
};

export default visualizerReducer;
