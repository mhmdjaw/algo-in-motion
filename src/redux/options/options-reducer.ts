import {
  CHANGE_EDGES,
  CHANGE_NODES,
  CHANGE_SIZE,
  CHANGE_SPEED,
  OptionsActionTypes,
  OptionsState,
  RESET_OPTIONS,
} from "./options-types";

const initialState: OptionsState = {
  speed: 100,
  size: 310,
  nodes: 12,
  edges: 0,
};

const optionsReducer = (
  state = initialState,
  action: OptionsActionTypes
): OptionsState => {
  switch (action.type) {
    case CHANGE_SPEED:
      return {
        ...state,
        speed: action.payload as number,
      };

    case CHANGE_SIZE:
      return {
        ...state,
        size: action.payload as number,
      };

    case CHANGE_NODES:
      return {
        ...state,
        nodes: action.payload as number,
      };

    case CHANGE_EDGES:
      return {
        ...state,
        edges: action.payload as number,
      };

    case RESET_OPTIONS:
      return {
        speed: 100,
        size: 310,
        nodes: 12,
        edges: 0,
      };

    default:
      return state;
  }
};

export default optionsReducer;
