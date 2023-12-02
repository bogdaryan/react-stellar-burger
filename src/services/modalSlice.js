import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientDetails: null,
  isOpened: false,

  orderRequest: false,
  orderFailed: false,
  orderNumber: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    getOrder(state) {
      state.orderRequest = true;
      state.orderFailed = false;
      state.isOpened = true;
    },
    getOrderSuccess(state, action) {
      state.orderRequest = false;
      state.orderNumber = action.payload;
    },
    getOrderFailed(state) {
      state.orderFailed = true;
      state.orderRequest = false;
    },

    setOpened(state, action) {
      state.isOpened = action.payload;

      if (!action.payload) {
        state.orderNumber = null;
        state.ingredientDetails = null;
      }
    },
    showIngredientDetails(state, action) {
      state.ingredientDetails = { ...action.payload };
      state.isOpened = true;
    },
  },
});

export default modalSlice.reducer;

export const {
  setOpened,
  showIngredientDetails,
  getOrder,
  getOrderSuccess,
  getOrderFailed,
} = modalSlice.actions;
