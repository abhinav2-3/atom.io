import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,
  },
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      state.userProfile = user;
    },
  },
});
export const { addUser } = userSlice.actions;
export default userSlice.reducer;
