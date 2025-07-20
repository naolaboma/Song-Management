import { combineReducers } from "redux";
import songsReducer from "./songsSlice";

const rootReducer = combineReducers({
  songs: songsReducer,
});

export default rootReducer;
