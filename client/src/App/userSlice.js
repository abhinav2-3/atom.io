import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ACTIVEUSER, API_USERPOSTS } from "../Utils/APIs";
import useCookie from "../Hooks/useCookie";

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  const { getCookie } = useCookie();
  const userId = getCookie("userData");
  const response = await axios.post(API_ACTIVEUSER, { id: userId });
  return response?.data?.user;
});
export const fetchUserFeed = createAsyncThunk("fetchUserFeed", async () => {
  const { getCookie } = useCookie();
  const userId = getCookie("userData");
  const response = await axios.post(API_USERPOSTS, { id: userId });
  return response?.data?.posts;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: {
      _id: "66275ee4f83e9dfdb2952953",
      name: "User",
      username: "username",
      email: "user@gmail.com",
      skills: [],
      connections: [],
      avatar: "",
    },
    userFeed: [],
    status: "idle",
  },
  reducers: {
    setUserFeed: (state, action) => {
      state.userFeed = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetching User Feed
    builder
      .addCase(fetchUserFeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserFeed.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUserFeed.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.userFeed = action.payload;
      });
    // Fetching User Profile
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.userProfile = action.payload;
      });
  },
});
export const { addUser, setUserFeed } = userSlice.actions;
export default userSlice.reducer;
