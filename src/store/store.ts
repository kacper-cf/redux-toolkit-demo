import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/counterSlice";
import userReducer from "./user/userSlice";

export const rootStore = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type AppState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
