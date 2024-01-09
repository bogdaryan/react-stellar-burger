import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpened(state, action) {
      state.isOpened = action.payload;
    },
  },
});

export default modal.reducer;

export const { setOpened } = modal.actions;
