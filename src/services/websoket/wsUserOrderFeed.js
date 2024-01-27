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
      })
      .addCase(wsError, (state, action) => {
        state.error = action.payload;
        state.wsConnected = false;
      })
      .addCase(wsClosed, (state) => {
        state.wsConnected = false;
      })
      .addCase(wsOnMessage, (state, action) => {
        const { orders } = action.payload;

        state.orders = [...orders];
        state.error = null;
      });
  },
});

export default wsUserOrderFeed.reducer;
