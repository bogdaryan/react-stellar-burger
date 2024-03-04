import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type State = { isOpened: boolean };

const initialState: State = { isOpened: false };

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpened(state, action: PayloadAction<boolean>) {
      state.isOpened = action.payload;
    },
  },
});

export default modal.reducer;

export const { setOpened } = modal.actions;
