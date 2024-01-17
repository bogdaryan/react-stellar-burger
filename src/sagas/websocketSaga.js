import { eventChannel } from "redux-saga";
import { call, put, take, takeLatest } from "redux-saga/effects";

import {
  wsConectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsOnMessage,
} from "../services/websoket/actions";

function createWebSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.onopen = (event) => emit(wsConnectionSuccess(event));
    socket.onerror = (error) => emit(wsConnectionError(error));
    socket.onclose = (event) => emit(wsConnectionClosed(event));
    socket.onmessage = ({ data }) => emit(wsOnMessage(JSON.parse(data)));

    return () => {
      socket.close();
    };
  });
}

function* workWebSoketSaga(action) {
  const url = action.payload;

  const socket = new WebSocket(url);
  const channel = yield call(createWebSocketChannel, socket);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* watchWebSocketSaga() {
  yield takeLatest(wsConectionStart.type, workWebSoketSaga);
}
