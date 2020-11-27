import { combineReducers } from "@reduxjs/toolkit";
import visualizerReducer from "./visualizer/visualizer-reducer";

const rootReducer = combineReducers({
  visualizer: visualizerReducer,
});

export default rootReducer;
