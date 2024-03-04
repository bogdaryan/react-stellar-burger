import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "../../types/types";

type State = {
  ingredientDetails: TIngredient | null;
  isOpened: boolean;
};

const initialState: State = {
  ingredientDetails: null,
  isOpened: false,
};

const ingredientDetails = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setIngredientDetails(state, action: PayloadAction<TIngredient>) {
      state.ingredientDetails = { ...action.payload };
      state.isOpened = true;
    },
  },
});

export default ingredientDetails.reducer;

export const { setIngredientDetails } = ingredientDetails.actions;
