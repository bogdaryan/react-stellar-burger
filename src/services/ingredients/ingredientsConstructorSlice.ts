import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "../../types/types";

type State = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

type TMoveAction = {
  [key: string]: number;
};

const initialState: State = {
  bun: null,
  ingredients: [],
};

const ingredientsConstructor = createSlice({
  name: "ingredientsConstructor",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
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
    deleteIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._key !== action.payload
      );
    },
    moveConstructorIngredient(state, action: PayloadAction<TMoveAction>) {
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
