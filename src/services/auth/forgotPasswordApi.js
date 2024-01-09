import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sendCodeRequest: false,
  sendCodeSuccess: false,
  sendCodeFailed: false,
};

const forgotPassword = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    sendCodeRequest(state) {
      state.sendCodeRequest = true;
    },
    sendCodeSuccess(state, action) {
      state.sendCodeSuccess = true;
      state.sendCodeRequest = false;
    },
    sendCodeFailed(state) {
      state.sendCodeFailed = true;
      state.sendCodeRequest = false;
    },
  },
});

export default forgotPassword.reducer;

export const { sendCodeRequest, sendCodeSuccess, sendCodeFailed } =
  forgotPassword.actions;
