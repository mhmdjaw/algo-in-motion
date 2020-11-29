import {
  CHANGE_SIZE,
  CHANGE_SPEED,
  OptionsActionTypes,
  RESET_OPTIONS,
} from "./options-types";

export const changeSpeed = (payload: number): OptionsActionTypes => {
  return {
    type: CHANGE_SPEED,
    payload: payload,
  };
};

export const changeSize = (payload: number): OptionsActionTypes => {
  return {
    type: CHANGE_SIZE,
    payload: payload,
  };
};

export const resetOptions = (): OptionsActionTypes => {
  return {
    type: RESET_OPTIONS,
  };
};
