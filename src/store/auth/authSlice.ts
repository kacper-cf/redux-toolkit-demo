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
  extraReducers: (builder) =>
    builder.addCase(authorize.fulfilled, (state, action) => {
      state.isLoggedIn = Boolean(action.payload);
    }),
});

export default authSlice.reducer;
