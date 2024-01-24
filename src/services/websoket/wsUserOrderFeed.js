import { createSlice } from "@reduxjs/toolkit";

import { wsSuccess, wsError, wsClosed, wsOnMessage } from "./actions";

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
      .addCase(wsSuccess, (state) => {
        state.wsConnected = true;
        state.error = null;
        state.wsConnecting = false;
      })
      .addCase(wsError, (state, action) => {
        state.error = action.payload;
        state.wsConnected = false;
        state.wsConnecting = false;
      })
      .addCase(wsClosed, (state) => {
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
