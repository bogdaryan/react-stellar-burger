import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { wsSuccess, wsError, wsClosed, wsOnMessage } from "./actions";
import { TWebSocketMessage, TWebSocketOrder } from "../../types/types";

type State = {
  wsConnected: boolean;
  error: string | null;
  orders: TWebSocketOrder[];
};

const initialState: State = {
  wsConnected: false,
  error: null,
  orders: [],
};

const wsUserFeedSlice = createSlice({
  name: "wsUserOrderFeed",
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
            const { orders } = action.payload;

            state.orders = [...orders];
            state.error = null;
          }
        }
      );
  },
});

export default wsUserFeedSlice.reducer;
