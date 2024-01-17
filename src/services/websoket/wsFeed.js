import { createSlice } from "@reduxjs/toolkit";

import {
  wsConectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsOnMessage,
} from "./actions";

const initialState = {
  wsConnected: false,
  wsConnecting: false,
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
      .addCase(wsConectionStart, (state) => {
        state.wsConnecting = true;
      })
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
