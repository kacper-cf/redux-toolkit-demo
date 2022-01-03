import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import counterReducer from "./counter/counterSlice";

export const rootStore = configureStore({
  reducer: {
    counter: counterReducer,
    user: useReducer,
  },
});

export type AppState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
