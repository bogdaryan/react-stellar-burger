import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    orderNumber: null,
    ingredientDetails: null,
    isOpened: false,
  },
  reducers: {
    setOpened(state, action) {
      state.isOpened = action.payload;

      if (!action.payload) {
        state.orderNumber = null;
        state.ingredientDetails = null;
      }
    },
    setOrderNumber(state, action) {
      state.orderNumber = action.payload;
      state.isOpened = true;
    },
    showIngredientDetails(state, action) {
      state.ingredientDetails = { ...action.payload };
      state.isOpened = true;
    },
  },
});

export default modalSlice.reducer;

export const { setOrderNumber, setOpened, showIngredientDetails } =
  modalSlice.actions;
