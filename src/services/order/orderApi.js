import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,

  orderNumber: null,
};

const orderApi = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderRequest(state) {
      state.orderRequest = true;
      state.orderFailed = false;
    },
    getOrderSuccess(state, action) {
      state.orderRequest = false;
      state.orderSuccess = true;

      state.orderNumber = action.payload;

      localStorage.setItem("orderNumber", action.payload);
    },
    getOrderFailed(state) {
      state.orderFailed = true;
      state.orderRequest = false;
    },
    resetState(state) {
      state.orderRequest = false;
      state.orderFailed = false;
      state.orderSuccess = false;
      state.orderNumber = null;
    },
  },
});

export default orderApi.reducer;

export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  setDefaultStatuses,
  resetState,
} = orderApi.actions;
