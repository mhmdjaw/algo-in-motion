import { Action } from "../action";
import {
  RESET_COMPLETE,
  RESET_VISUALIZER,
  RUN_VISUALIZER,
} from "./visualizer-types";

interface state {
  isRunning: boolean;
  isGenerated: boolean;
  isResetting: boolean;
}

const initialState: state = {
  isRunning: false,
  isGenerated: true,
  isResetting: false,
};

const visualizerReducer = (state = initialState, action: Action): state => {
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
      };
    case RESET_COMPLETE:
      return {
        ...state,
        isResetting: false,
      };
    default:
      return state;
  }
};

export default visualizerReducer;
