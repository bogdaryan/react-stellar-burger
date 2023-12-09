import { all } from "redux-saga/effects";
import watchFetchIngredients from "./ingredientsSaga";
import watchOrderSaga from "./orderSaga";

export default function* rootSaga() {
  yield all([watchFetchIngredients(), watchOrderSaga()]);
}
