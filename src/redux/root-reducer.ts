import { combineReducers } from "@reduxjs/toolkit";
import optionsReducer from "./options/options-reducer";
import visualizerReducer from "./visualizer/visualizer-reducer";

const rootReducer = combineReducers({
  visualizer: visualizerReducer,
  options: optionsReducer,
});

export default rootReducer;
