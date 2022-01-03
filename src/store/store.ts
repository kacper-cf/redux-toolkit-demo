import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";

export const rootStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type AppState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
