import { createSlice } from "@reduxjs/toolkit";

import { wsSuccess, wsError, wsClosed, wsOnMessage } from "./actions";

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

      .addCase(wsSuccess, (state) => {
        state.wsConnected = true;
        state.error = null;
      })
      .addCase(wsError, (state, action) => {
        state.error = action.payload;
        state.wsConnected = false;
      })
      .addCase(wsClosed, (state) => {
        state.wsConnected = false;
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
