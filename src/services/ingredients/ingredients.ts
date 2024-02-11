import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: null,
};

const ingredients = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
  },
});

export default ingredients.reducer;

export const { setIngredients } = ingredients.actions;
