import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerRequest: false,
  registerSuccess: false,
  registerFailed: false,
};

const register = createSlice({
  name: "register",
  initialState,
  reducers: {
    userRegisterRequest(state) {
      state.registerRequest = true;
    },
    userRegisterSuccess(state, action) {
      state.registerSuccess = true;
      state.registerRequest = false;
    },
    userRegisterFailed(state) {
      state.registerFailed = true;
      state.registerRequest = false;
    },
  },
});

export default register.reducer;

export const { userRegisterRequest, userRegisterSuccess, userRegisterFailed } =
  register.actions;
