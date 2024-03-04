import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../types/types";

type State = {
  user: TUser | null;
  isLoggedIn: boolean;
};

const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const user = JSON.parse(localStorage.getItem("user") as string);

const initialState: State = {
  user: user || null,
  isLoggedIn: isLoggedIn || false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ user: TUser; isLoggedIn: boolean }>
    ) {
      const { user, isLoggedIn } = action.payload;

      state.user = user;
      state.isLoggedIn = isLoggedIn;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
