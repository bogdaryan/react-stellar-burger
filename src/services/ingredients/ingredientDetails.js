import { createSlice } from "@reduxjs/toolkit";
import { setOpened } from "../modal/modal";

const initialState = {
  ingredientDetails: null,
  isOpened: false,
};

const ingredientDetails = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    showIngredientDetails(state, action) {
      state.ingredientDetails = { ...action.payload };
      state.isOpened = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setOpened, (state) => {
      state.ingredientDetails = null;
      state.isOpened = false;
    });
  },
});

export default ingredientDetails.reducer;

export const { showIngredientDetails } = ingredientDetails.actions;
