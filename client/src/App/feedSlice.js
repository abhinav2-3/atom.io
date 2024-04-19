import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_FEEDPOST } from "../Utils/APIs";

export const initialState = {
  feeds: [],
  status: "idle",
  error: null,
};

export const getAllFeeds = createAsyncThunk("getAllFeeds", async () => {
  const response = await axios.get(API_FEEDPOST);
  return response.data.feedPosts;
});

export const feedPostSlice = createSlice({
  name: "feed",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.feeds = action.payload;
      });
  },
});

export default feedPostSlice.reducer;
