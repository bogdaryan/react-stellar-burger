import { createSlice } from "@reduxjs/toolkit";
import { setOpened } from "./modalSlice";

const initialState = {
  ingredientDetails: null,

  isOpened: false,
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    showIngredientDetails(state, action) {
      state.ingredientDetails = { ...action.payload };
      state.isOpened = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(setOpened, (state) => {
      state.ingredientDetails = null;
      state.isOpened = false;
    });
  },
});

export default ingredientDetailsSlice.reducer;

export const { showIngredientDetails } = ingredientDetailsSlice.actions;
