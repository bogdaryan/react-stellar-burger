import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
};

const resetPassword = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    resetPasswordRequest(state) {
      state.resetPasswordRequest = true;
    },
    resetPasswordSuccess(state) {
      state.resetPasswordSuccess = true;
      state.resetPasswordRequest = false;
    },
    resetPasswordFailed(state) {
      state.resetPasswordFailed = true;
      state.resetPasswordRequest = false;
    },
  },
});

export default resetPassword.reducer;

export const {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
} = resetPassword.actions;
