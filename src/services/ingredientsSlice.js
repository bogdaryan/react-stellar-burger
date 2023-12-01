import { createSlice } from "@reduxjs/toolkit";

const ingredientsSlice = createSlice({
  name: "toolkit",
  initialState: {
    bun: null,
    constructorIngredients: [],
    menu: [],
  },
  reducers: {
    loadIngredients(state, action) {
      state.menu = [...action.payload];
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
        (el) => el._idConstructor !== action.payload
      );
    },
  },
});

export default ingredientsSlice.reducer;

export const { addIngredient, deleteIngredient, loadIngredients } =
  ingredientsSlice.actions;
