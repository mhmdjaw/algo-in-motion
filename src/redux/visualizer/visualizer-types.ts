export const RUN_VISUALIZER = "RUN_VISUALIZER";
export const RESET_VISUALIZER = "RESET_VISUALIZER";
export const CHANGE_VISUALIZER = "CHANGE_VISUALIZER";
export const VISUALIZATION_COMPLETE = "VISUALIZATION_COMPLETE";

export interface VisualizerState {
  isRunning: boolean;
  isGenerated: boolean;
  resetToggle: boolean;
  isComplete: boolean;
}
