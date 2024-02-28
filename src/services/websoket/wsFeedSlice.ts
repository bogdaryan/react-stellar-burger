import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TWebSocketMessage, TWebSocketOrder } from "../../types/types";
import { wsSuccess, wsError, wsClosed, wsOnMessage } from "./actions";

export interface State {
  wsConnected: boolean;
  error: string | null;
  orders: TWebSocketOrder[];
  total: number;
  totalToday: number;
}

const initialState: State = {
  wsConnected: false,
  error: null,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsFeedSlice = createSlice({
  name: "wsFeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wsSuccess, (state) => {
        state.wsConnected = true;
        state.error = null;
      })
      .addCase(wsError, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || null;
        state.wsConnected = false;
      })
      .addCase(wsClosed, (state) => {
        state.wsConnected = false;
      })
      .addCase(
        wsOnMessage,
        (state, action: PayloadAction<TWebSocketMessage | undefined>) => {
          if (action.payload) {
            const { orders, total, totalToday } = action.payload;
            state.orders = [...orders];
            state.total = total || 0;
            state.totalToday = totalToday || 0;
          }
        }
      );
  },
});

export default wsFeedSlice.reducer;
