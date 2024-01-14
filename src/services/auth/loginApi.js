import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLoginRequest(state) {
      state.loginRequest = true;
    },
    userLoginSuccess(state, action) {
      state.loginSuccess = true;
      state.loginRequest = false;
    },
    userLoginFailed(state) {
      state.loginFailed = true;
      state.loginRequest = false;
    },
  },
});

export default login.reducer;

export const { userLoginRequest, userLoginSuccess, userLoginFailed } =
  login.actions;
