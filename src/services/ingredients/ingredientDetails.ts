import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientDetails: null,
  isOpened: false,
};

const ingredientDetails = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setIngredientDetails(state, action) {
      state.ingredientDetails = { ...action.payload };
      state.isOpened = true;
    },
  },
});

export default ingredientDetails.reducer;

export const { setIngredientDetails } = ingredientDetails.actions;
