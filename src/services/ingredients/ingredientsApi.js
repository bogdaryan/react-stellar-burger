import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
};

const ingredientsApi = createSlice({
  name: "ingredientsApi",
  initialState,
  reducers: {
    getIngredientsRequest(state) {
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
  },
});

export default ingredientsApi.reducer;

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
} = ingredientsApi.actions;
