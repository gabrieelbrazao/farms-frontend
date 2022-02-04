/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerIsVisible: false,
  siderIsCollapsed: false,
  siderSelectedKeys: ["1"],
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setDrawerIsVisible: (state, { payload }) => {
      state.drawerIsVisible = payload;
    },
    setSiderIsCollapsed: (state, { payload }) => {
      state.siderIsCollapsed = payload;
    },
    setSiderSelectedKeys: (state, { payload }) => {
      state.siderSelectedKeys = payload;
    },
  },
});

export default miscSlice.reducer;

export const { setDrawerIsVisible, setSiderIsCollapsed, setSiderSelectedKeys } =
  miscSlice.actions;
