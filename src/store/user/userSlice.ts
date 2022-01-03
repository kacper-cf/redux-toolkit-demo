import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./user";

export interface UserModel {
  name?: string;
  surname?: string;
}

interface RequestStatus {
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
      .addCase(fetchUser.pending, (state) => {
        state.fetchUserRequest.isPending = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchUserRequest.isPending = false;
        state.fetchUserRequest.isDone = true;

        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchUserRequest.isPending = false;
        state.fetchUserRequest.isDone = false;
        state.fetchUserRequest.error =
          action.error?.message || "Something went really wrong!";
      });
  },
});

export default userSlice.reducer;
