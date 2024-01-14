import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editUserRequest: false,
  editUserSuccess: false,
  editUserFailed: false,
};

const editUser = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    editUserRequest(state) {
      state.editUserRequest = true;
    },
    editUserSuccess(state) {
      state.editUserSuccess = true;
      state.editUserRequest = false;
    },
    editUserFailed(state) {
      state.editUserFailed = true;
      state.editUserRequest = false;
    },
  },
});

export default editUser.reducer;

export const { editUserRequest, editUserSuccess, editUserFailed } =
  editUser.actions;
