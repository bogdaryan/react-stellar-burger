import { put, takeLatest } from "redux-saga/effects";

import { setUser } from "../services/auth/user";

import {
  login,
  register,
  logout,
  sendCodeToEmail,
  resetPassword,
  patchUser,
} from "../utils/api";

import {
  userRegisterSuccess,
  userRegisterRequest,
  userRegisterFailed,
} from "../services/auth/registerApi";

import {
  userLoginSuccess,
  userLoginRequest,
  userLoginFailed,
} from "../services/auth/loginApi";

import {
  userLogoutSuccess,
  userLogoutRequest,
  userLogoutFailed,
} from "../services/auth/logoutApi";

import {
  sendCodeSuccess,
  sendCodeRequest,
  sendCodeFailed,
} from "../services/auth/forgotPasswordApi";

import {
  resetPasswordSuccess,
  resetPasswordRequest,
  resetPasswordFailed,
} from "../services/auth/resetPasswordApi";

import {
  editUserSuccess,
  editUserRequest,
  editUserFailed,
} from "../services/auth/editUser";

function* workLoginSaga(action) {
  try {
    const { data } = yield login(action.payload);
    yield put(userLoginSuccess());
    yield put(setUser(data.user));
  } catch {
    yield put(userLoginFailed());
  }
}

function* workRegisterSaga(action) {
  try {
    const { data } = yield register(action.payload);
    yield put(userRegisterSuccess());
    yield put(setUser(data.user));
  } catch {
    yield put(userRegisterFailed());
  }
}

function* workLogoutSaga(action) {
  const refreshToken = action.payload;

  try {
    yield logout(refreshToken);
    yield put(userLogoutSuccess());
    yield put(setUser(null));
    yield localStorage.clear();
  } catch {
    yield put(userLogoutFailed());
  }
}

function* workSendCodeSaga(action) {
  try {
    yield sendCodeToEmail(action.payload);
    yield put(sendCodeSuccess());
  } catch {
    yield put(sendCodeFailed());
  }
}

function* workResetPasswordSaga(action) {
  try {
    yield resetPassword(action.payload);
    yield put(resetPasswordSuccess());
  } catch {
    yield put(resetPasswordFailed());
  }
}

function* workEditUserSaga(action) {
  try {
    yield patchUser(action.payload);
    yield put(editUserSuccess());
  } catch {
    yield put(editUserFailed());
  }
}

export default function* watchUserSaga() {
  yield takeLatest(userRegisterRequest.type, workRegisterSaga);
  yield takeLatest(userLoginRequest.type, workLoginSaga);
  yield takeLatest(userLogoutRequest.type, workLogoutSaga);
  yield takeLatest(sendCodeRequest.type, workSendCodeSaga);
  yield takeLatest(resetPasswordRequest.type, workResetPasswordSaga);
  yield takeLatest(editUserRequest.type, workEditUserSaga);
}
