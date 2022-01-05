import { createSlice } from "@reduxjs/toolkit";
import { authorize } from "../user/user";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [authorize.fulfilled.type]: (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true;
      }
    },
  },
});

export default authSlice.reducer;
