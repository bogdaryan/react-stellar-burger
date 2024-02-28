import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "../../types/types";

type State = { ingredients: TIngredient[] | null };

const initialState: State = { ingredients: null };

const ingredients = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients(state, action: PayloadAction<TIngredient[]>) {
      state.ingredients = action.payload;
    },
  },
});

export default ingredients.reducer;

export const { setIngredients } = ingredients.actions;
