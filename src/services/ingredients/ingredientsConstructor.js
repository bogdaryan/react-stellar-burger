import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [],
};

const ingredientsConstructor = createSlice({
  name: "ingredientsConstructor",
  initialState,
  reducers: {
    addIngredient(state, action) {
      const ingredient = {
        ...action.payload,
        _key: nanoid(),
      };

      if (ingredient.type !== "bun") {
        state.ingredients.push(ingredient);
      } else {
        state.bun = action.payload;
      }
    },
    deleteIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (el) => el._key !== action.payload
      );
    },
    moveConstructorIngredient(state, action) {
      state.ingredients.splice(
        action.payload.hoverIndex,
        0,
        state.ingredients.splice(action.payload.dragIndex, 1)[0]
      );
    },
  },
});

export default ingredientsConstructor.reducer;

export const { addIngredient, deleteIngredient, moveConstructorIngredient } =
  ingredientsConstructor.actions;
