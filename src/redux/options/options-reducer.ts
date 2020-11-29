import {
  CHANGE_SIZE,
  CHANGE_SPEED,
  OptionsActionTypes,
  OptionsState,
} from "./options-types";

const initialState: OptionsState = {
  speed: 100,
  size: 310,
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

    default:
      return state;
  }
};

export default optionsReducer;
