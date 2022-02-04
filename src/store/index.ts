import { configureStore } from "@reduxjs/toolkit";
import farmsSlice from "./slices/farms";
import miscSlice from "./slices/misc";

export const store = configureStore({
  reducer: {
    farms: farmsSlice,
    misc: miscSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
