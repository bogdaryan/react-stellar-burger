import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  constructorIngredients: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
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

export const { addIngredient, deleteIngredient, moveConstructorIngredient } =
  ingredientsSlice.actions;
