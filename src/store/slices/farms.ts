/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

type TFarmsState = {
  data: TFarm[];
  editingId: number;
  tableLoading: boolean;
};

const initialState: TFarmsState = {
  data: [],
  editingId: 0,
  tableLoading: false,
};

const farmsSlice = createSlice({
  name: "farms",
  initialState,
  reducers: {
    setFarms: (state, { payload }) => {
      state.data = payload;
    },
    deleteFarm: (state, { payload }) => {
      state.data = state.data.filter((farm) => farm.id !== payload);
    },
    createFarm: (state, { payload }) => {
      state.data.push(payload);
    },
    updateFarm: (state, { payload }) => {
      state.data = state.data.map((farm) =>
        farm.id === payload.id ? payload : farm
      );
    },
    setEditingId: (state, { payload }) => {
      state.editingId = payload;
    },
    setTableLoading: (state, { payload }) => {
      state.tableLoading = payload;
    },
  },
});

export default farmsSlice.reducer;

export const {
  setFarms,
  deleteFarm,
  createFarm,
  updateFarm,
  setEditingId,
  setTableLoading,
} = farmsSlice.actions;
