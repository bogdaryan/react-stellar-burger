import { put, takeLatest } from "redux-saga/effects";

import {
  getOrderSuccess,
  getOrderFailed,
  getOrderRequest,
} from "../services/order/orderApi";

import { axiosInstance } from "../utils/api";
import { getAccessToken } from "../utils/helpers";

function* workOrderSaga(action) {
  const { payload: ingredients } = action;

  try {
    const { data } = yield axiosInstance.post(
      `/orders`,
      { ingredients },
      { headers: { Authorization: getAccessToken() } }
    );

    const orderNumber = data.order.number;

    yield put(getOrderSuccess(orderNumber));
  } catch (error) {
    yield put(getOrderFailed());
  }
}

export default function* watchOrderSaga() {
  yield takeLatest(getOrderRequest.type, workOrderSaga);
}
