import { all } from "redux-saga/effects";
import watchFetchIngredients from "./ingredientsSaga";
import watchOrderSaga from "./orderSaga";
import watchUserSaga from "./userSaga";
import watchWebSocketSaga from "./websocketSaga";

const sagas = [
  watchFetchIngredients(),
  watchOrderSaga(),
  watchUserSaga(),
  watchWebSocketSaga(),
];

export default function* rootSaga() {
  yield all(sagas);
}
