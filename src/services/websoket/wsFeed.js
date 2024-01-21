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
  total: null,
  totalToday: null,
};

const wsFeed = createSlice({
  name: "wsFeed",
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
        const { orders, total, totalToday } = action.payload;

        state.orders = [...orders];
        state.total = total;
        state.totalToday = totalToday;

        state.error = null;
      });
  },
});

export default wsFeed.reducer;
