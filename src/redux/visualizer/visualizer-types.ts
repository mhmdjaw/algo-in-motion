export const RUN_VISUALIZER = "RUN_VISUALIZER";
export const RESET_VISUALIZER = "RESET_VISUALIZER";
export const RESET_COMPLETE = "RESET_COMPLETE";
export const CHANGE_VISUALIZER = "CHANGE_VISUALIZER";

export interface VisualizerState {
  isRunning: boolean;
  isGenerated: boolean;
  isResetting: boolean;
}

export interface VisualizerActionTypes {
  type: string;
}
