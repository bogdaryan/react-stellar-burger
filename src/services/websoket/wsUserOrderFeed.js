import { createSlice } from "@reduxjs/toolkit";

import {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsOnMessage,
} from "./actions";

const initialState = {
  wsConnected: false,
  error: null,
  orders: [],
};

const wsUserOrderFeed = createSlice({
  name: "wsUserOrderFeed",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(wsConnectionSuccess, (state) => {
        state.wsConnected = true;
        state.error = null;
        state.wsConnecting = false;
      })
      .addCase(wsConnectionError, (state, action) => {
        state.error = action.payload;
        state.wsConnected = false;
        state.wsConnecting = false;
      })
      .addCase(wsConnectionClosed, (state) => {
        state.wsConnected = false;
        state.wsConnecting = false;
      })
      .addCase(wsOnMessage, (state, action) => {
        const { orders } = action.payload;

        state.orders = [...orders];
        state.error = null;
      });
  },
});

export default wsUserOrderFeed.reducer;
