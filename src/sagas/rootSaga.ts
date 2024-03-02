import watchWebSocketSaga from "./websocketSaga";

export default function* rootSaga() {
  yield watchWebSocketSaga();
}
