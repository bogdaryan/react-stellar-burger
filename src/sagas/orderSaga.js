import { put, takeLatest } from "redux-saga/effects";

import axios from "axios";
import { URL } from "../utils/constants";

import {
  getOrderSuccess,
  getOrderFailed,
  getOrderRequest,
} from "../services/order/orderApi";

function* workOrderSaga(action) {
  const { payload: ingredients } = action;

  try {
    const response = yield axios.post(`${URL}/orders`, { ingredients });
    yield put(getOrderSuccess(response.data.order.number));
  } catch (error) {
    yield put(getOrderFailed());
  }
}

export default function* watchOrderSaga() {
  yield takeLatest(getOrderRequest.type, workOrderSaga);
}
