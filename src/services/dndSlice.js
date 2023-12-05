import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrag: null,
  typeIngredient: null,
};

const dndSlice = createSlice({
  name: "dnd",
  initialState,
  reducers: {
    isDraging(state, action) {
      state.isDrag = action.payload.isDrag;
      state.typeIngredient = action.payload.type;
    },
  },
});

export default dndSlice.reducer;

export const { isDraging } = dndSlice.actions;
