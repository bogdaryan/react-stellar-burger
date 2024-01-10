export const getUser = (store) => store.user.user;
export const getCodeRequestStatus = (store) =>
  store.forgotPassword.sendCodeSuccess;
export const getResetRequestStatus = (store) =>
  store.forgotPassword.resetPasswordSuccess;
export const getEditUserRequestStatus = (store) =>
  store.editUser.editUserSuccess;
