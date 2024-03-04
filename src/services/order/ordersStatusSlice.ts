import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { TOrderDetails } from "../../types/types";

enableMapSet();

type State = { [key: string]: Set<number> };

const initialState: State = {
  ordersDone: new Set([]),
  ordersPending: new Set([]),
};

const ordersStatusSlice = createSlice({
  name: "ordersNumberStatus",
  initialState,
  reducers: {
    setOrderStatus(state, action: PayloadAction<TOrderDetails[]>) {
      const orders = action.payload;

      orders.forEach(({ status, number }) => {
        if (status === "pending") {
          state.ordersPending.add(number);
        }

        if (status === "done") {
          state.ordersDone.add(number);
          state.ordersPending.delete(number);
        }
      });
    },
  },
});

export default ordersStatusSlice.reducer;
export const { setOrderStatus } = ordersStatusSlice.actions;
