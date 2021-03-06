import { createSlice } from "@reduxjs/toolkit";
import { authorize } from "./user";

export interface UserModel {
  name?: string;
  surname?: string;
}

export interface RequestStatus {
  isPending: boolean;
  isDone: boolean;
  error: string;
}

export interface UserState {
  user: UserModel | null;
  fetchUserRequest: RequestStatus;
}

const initialState: UserState = {
  user: null,
  fetchUserRequest: {
    isPending: false,
    isDone: false,
    error: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authorize.pending, (state) => {
        state.fetchUserRequest.isPending = true;
      })
      .addCase(authorize.fulfilled, (state, action) => {
        state.fetchUserRequest.isPending = false;
        state.fetchUserRequest.isDone = true;

        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(authorize.rejected, (state, action) => {
        state.fetchUserRequest.isPending = false;
        state.fetchUserRequest.isDone = false;
        state.fetchUserRequest.error =
          action.error?.message || "Something went really wrong!";
      });
  },
});

export default userSlice.reducer;
