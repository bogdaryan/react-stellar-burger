import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthCheked: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default user.reducer;

export const { setUser, setAuthCheked } = user.actions;
