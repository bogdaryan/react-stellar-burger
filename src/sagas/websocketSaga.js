import { eventChannel } from "redux-saga";
import {
  call,
  cancel,
  cancelled,
  put,
  take,
  takeLatest,
} from "redux-saga/effects";

import {
  wsConnect,
  wsSuccess,
  wsError,
  wsClosed,
  wsOnMessage,
  wsDisconnect,
} from "../services/websoket/actions";

function createWebSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.onopen = (event) => emit(wsSuccess(event));
    socket.onerror = (error) => emit(wsError(error));
    socket.onclose = (event) => emit(wsClosed(event));
    socket.onmessage = ({ data }) => emit(wsOnMessage(JSON.parse(data)));

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  });
}

function* workWebSocketSaga(action) {
  const url = action.payload;
  const socket = new WebSocket(url);
  const channel = yield call(createWebSocketChannel, socket);

  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export default function* watchWebSocketSaga() {
  yield takeLatest(wsConnect.type, workWebSocketSaga);
}

export function* cancelWebSocketSaga() {
  const task = yield takeLatest(wsDisconnect.type, workWebSocketSaga);
  yield take(wsDisconnect);
  yield cancel(task);
}
