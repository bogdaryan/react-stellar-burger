import { put, takeLatest } from "redux-saga/effects";

import axios from "axios";
import { URL } from "../utils/constants";

import {
  getIngredientsSuccess,
  getIngredientsFailed,
  getIngredientsRequest,
} from "../services/ingredientsApiSlice";

function* workIngredientsSaga() {
  try {
    const response = yield axios.get(`${URL}/ingredients`);
    yield put(getIngredientsSuccess(response.data.data));
  } catch (error) {
    yield put(getIngredientsFailed());
  }
}

export default function* watchFetchIngredients() {
  yield takeLatest(getIngredientsRequest.type, workIngredientsSaga);
}
