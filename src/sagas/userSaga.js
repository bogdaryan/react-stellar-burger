import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { URL } from "../utils/constants";

import { setUserDataToLocalStorage } from "../utils/helpers";
import { setUser } from "../services/auth/user";

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
import { login } from "../utils/api";

function* workUserLoginSaga(action) {
  try {
    const { data } = yield login(action.payload);
    yield put(userLoginSuccess());

    yield setUserDataToLocalStorage(data);
    yield put(setUser(data.user));
  } catch {
    yield put(userLoginFailed());
  }
}

function* workUserRegisterSaga(action) {
  const { name, email, password } = action.payload;

  try {
    const { data } = yield axios.post(`${URL}/auth/register`, {
      name,
      email,
      password,
    });

    yield put(userRegisterSuccess());
    yield setUserDataToLocalStorage(data);
    yield put(setUser(data.user));
  } catch {
    yield put(userRegisterFailed());
  }
}

function* workUserLogoutSaga(action) {
  const refreshToken = action.payload;

  try {
    const response = yield axios.post(`${URL}/auth/logout`, {
      token: `${refreshToken}`,
    });

    yield put(userLogoutSuccess());
    yield put(setUser(null));
    yield localStorage.clear();
    return response;
  } catch {
    yield put(userLogoutFailed());
  }
}

function* workUserForgotPasswordSaga(action) {
  const email = action.payload;

  try {
    const response = yield axios.post(`${URL}/password-reset`, { email });

    yield put(sendCodeSuccess());
  } catch {
    yield put(sendCodeFailed());
  }
}

export default function* watchUserSaga() {
  yield takeLatest(userRegisterRequest.type, workUserRegisterSaga);
  yield takeLatest(userLoginRequest.type, workUserLoginSaga);
  yield takeLatest(userLogoutRequest.type, workUserLogoutSaga);
  yield takeLatest(sendCodeRequest.type, workUserForgotPasswordSaga);
}
