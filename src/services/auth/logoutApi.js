import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: false,
};

const logout = createSlice({
  name: "logout",
  initialState,
  reducers: {
    userLogoutRequest(state) {
      state.logoutRequest = true;
    },
    userLogoutSuccess(state) {
      state.logoutSuccess = true;
      state.logoutRequest = false;
    },
    userLogoutFailed(state) {
      state.logoutFailed = true;
      state.logoutRequest = false;
    },
  },
});

export default logout.reducer;

export const { userLogoutRequest, userLogoutSuccess, userLogoutFailed } =
  logout.actions;
