import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

const initialState = {
  ordersDone: new Set([]),
  ordersPending: new Set([]),
};

const ordersNumberStatus = createSlice({
  name: "ordersNumberStatus",
  initialState,
  reducers: {
    setOrderStatus(state, action) {
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

export default ordersNumberStatus.reducer;
export const { setOrderStatus } = ordersNumberStatus.actions;
