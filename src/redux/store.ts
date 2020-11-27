import { createStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";

const store = createStore(rootReducer);

export default store;
