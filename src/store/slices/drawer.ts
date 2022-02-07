/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerIsVisible: false,
  siderIsCollapsed: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setDrawerIsVisible: (state, { payload }) => {
      state.drawerIsVisible = payload;
    },
  },
});

export default drawerSlice.reducer;

export const { setDrawerIsVisible } = drawerSlice.actions;
