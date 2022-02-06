/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerIsVisible: false,
  siderIsCollapsed: false,
  currentPage: "Dashboard",
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
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
});

export default miscSlice.reducer;

export const { setDrawerIsVisible, setSiderIsCollapsed, setCurrentPage } =
  miscSlice.actions;
