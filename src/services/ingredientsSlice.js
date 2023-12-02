import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  constructorIngredients: [],

  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getIngredients(state) {
      state.ingredientsRequest = true;
      state.ingredientsFailed = false;
    },
    getIngredientsSuccess(state, action) {
      state.ingredientsRequest = false;
      state.ingredients = [...action.payload];
    },
    getIngredientsFailed(state) {
      state.ingredientsFailed = true;
      state.ingredientsRequest = false;
    },
    addIngredient(state, action) {
      if (action.payload.type !== "bun") {
        state.constructorIngredients.push(action.payload);
      } else {
        state.bun = action.payload;
      }
    },
    deleteIngredient(state, action) {
      state.constructorIngredients = state.constructorIngredients.filter(
        (el) => el._key !== action.payload
      );
    },
  },
});

export default ingredientsSlice.reducer;

export const {
  addIngredient,
  deleteIngredient,
  getIngredients,
  getIngredientsSuccess,
  getIngredientsFailed,
} = ingredientsSlice.actions;
