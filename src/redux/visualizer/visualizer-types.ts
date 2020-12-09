export const RUN_VISUALIZER = "RUN_VISUALIZER";
export const RESET_VISUALIZER = "RESET_VISUALIZER";
export const CHANGE_VISUALIZER = "CHANGE_VISUALIZER";
export const VISUALIZATION_COMPLETE = "VISUALIZATION_COMPLETE";
export const GENERATE_VISUALIZER = "GENERATE_VISUALIZER";
export const GENERATION_COMPLETE = "GENERATION_COMPLETE";

export interface VisualizerState {
  isRunning: boolean;
  isGenerating: boolean;
  resetToggle: boolean;
  isComplete: boolean;
}
