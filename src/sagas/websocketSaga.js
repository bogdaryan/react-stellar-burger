import { eventChannel } from "redux-saga";
import { call, put, take, takeLatest } from "redux-saga/effects";

import {
  wsConnect,
  wsSuccess,
  wsError,
  wsClosed,
  wsOnMessage,
} from "../services/websoket/actions";

function createWebSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.onopen = (event) => emit(wsSuccess(event));
    socket.onerror = (error) => emit(wsError(error));
    socket.onclose = (event) => emit(wsClosed(event));
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
  yield takeLatest(wsConnect.type, workWebSoketSaga);
}
