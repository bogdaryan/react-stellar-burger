import { all } from "redux-saga/effects";
import watchFetchIngredients from "./ingredientsSaga";
import watchOrderSaga from "./orderSaga";
import watchUserSaga from "./userSaga";

const sagas = [watchFetchIngredients(), watchOrderSaga(), watchUserSaga()];

export default function* rootSaga() {
  yield all(sagas);
}
