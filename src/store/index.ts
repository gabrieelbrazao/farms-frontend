import { configureStore } from "@reduxjs/toolkit";
import farmsSlice from "./slices/farms";
import drawerSlice from "./slices/drawer";

export const store = configureStore({
  reducer: {
    farms: farmsSlice,
    drawer: drawerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
