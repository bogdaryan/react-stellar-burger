import { createSlice, nanoid } from "@reduxjs/toolkit";

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
      const ingredient = {
        ...action.payload,
        _key: nanoid(),
      };

      if (ingredient.type !== "bun") {
        state.constructorIngredients.push(ingredient);
      } else {
        state.bun = action.payload;
      }
    },
    deleteIngredient(state, action) {
      state.constructorIngredients = state.constructorIngredients.filter(
        (el) => el._key !== action.payload
      );
    },
    moveConstructorIngredient(state, action) {
      state.constructorIngredients.splice(
        action.payload.hoverIndex,
        0,
        state.constructorIngredients.splice(action.payload.dragIndex, 1)[0]
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
  moveConstructorIngredient,
} = ingredientsSlice.actions;
