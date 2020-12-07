import {
  CHANGE_CITIES,
  CHANGE_EDGES,
  CHANGE_NODES,
  CHANGE_POINTS,
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

export const changeNodes = (payload: number): OptionsActionTypes => {
  return {
    type: CHANGE_NODES,
    payload: payload,
  };
};

export const changeEdges = (payload: number): OptionsActionTypes => {
  return {
    type: CHANGE_EDGES,
    payload: payload,
  };
};

export const changePoints = (payload: number): OptionsActionTypes => {
  return {
    type: CHANGE_POINTS,
    payload: payload,
  };
};

export const changeCities = (payload: number): OptionsActionTypes => {
  return {
    type: CHANGE_CITIES,
    payload: payload,
  };
};

export const resetOptions = (): OptionsActionTypes => {
  return {
    type: RESET_OPTIONS,
  };
};
