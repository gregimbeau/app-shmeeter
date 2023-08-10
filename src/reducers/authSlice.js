// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("jwt") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("jwt", action.payload.token);
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("jwt");
    },
  },
});

// Export actions
export const { loginUser, logoutUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
