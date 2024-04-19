import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice";
import userReducer from "./userSlice";

const reducer = {
  feed: feedReducer,
  user: userReducer,
};

const store = configureStore({
  reducer,
});

export default store;
