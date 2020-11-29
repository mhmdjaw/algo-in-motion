import { Action } from "@reduxjs/toolkit";

export const CHANGE_SIZE = "CHANGE_SIZE";
export const CHANGE_SPEED = "CHANGE_SPEED";
export const RESET_OPTIONS = "RESET_OPTIONS";

export interface OptionsState {
  speed: number;
  size: number;
}

export interface OptionsActionTypes extends Action {
  payload?: number;
}
