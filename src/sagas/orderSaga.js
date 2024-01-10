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
    const orderNumber = response.data.order.number;

    yield put(getOrderSuccess(orderNumber));
  } catch (error) {
    yield put(getOrderFailed());
  }
}

export default function* watchOrderSaga() {
  yield takeLatest(getOrderRequest.type, workOrderSaga);
}
