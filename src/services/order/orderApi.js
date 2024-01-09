import { createSlice } from "@reduxjs/toolkit";

import { setOpened } from "../modal/modal";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderNumber: null,

  isOpened: false,
};

const orderApi = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderRequest(state) {
      state.orderRequest = true;
      state.orderFailed = false;
      state.isOpened = true;
    },
    getOrderSuccess(state, action) {
      state.orderRequest = false;
      state.orderNumber = action.payload;
    },
    getOrderFailed(state) {
      state.orderFailed = true;
      state.orderRequest = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setOpened, (state) => {
      state.orderNumber = null;
      state.isOpened = false;
    });
  },
});

export default orderApi.reducer;

export const { getOrderRequest, getOrderSuccess, getOrderFailed } =
  orderApi.actions;
