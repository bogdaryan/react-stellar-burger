import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpened(state, action) {
      state.isOpened = action.payload;
    },
  },
});

export default modalSlice.reducer;

export const { setOpened } = modalSlice.actions;
