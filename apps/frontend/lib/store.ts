import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "./features/timer/timerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      timer: timerSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
