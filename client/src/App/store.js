import { combineReducers, configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  feed: feedReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
