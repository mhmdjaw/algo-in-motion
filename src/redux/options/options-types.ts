import { Action } from "@reduxjs/toolkit";

export const CHANGE_SIZE = "CHANGE_SIZE";
export const CHANGE_NODES = "CHANGE_NODES";
export const CHANGE_EDGES = "CHANGE_EDGES";
export const CHANGE_SPEED = "CHANGE_SPEED";
export const RESET_OPTIONS = "RESET_OPTIONS";

export interface OptionsState {
  speed: number;
  size: number;
  nodes: number;
  edges: number;
}

export interface OptionsActionTypes extends Action {
  payload?: number;
}
