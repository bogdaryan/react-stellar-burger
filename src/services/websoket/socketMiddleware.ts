import { Middleware } from "redux";
import {
  wsConnect,
  wsDisconnect,
  wsSuccess,
  wsError,
  wsClose,
  wsOnMessage,
} from "./actions";

export const socketMiddleware: Middleware = (store) => (next) => (action) => {
  const { dispatch } = store;
  const { type, payload } = action;

  let socket: WebSocket | null = null;

  if (type === wsConnect.type && payload) {
    socket = new WebSocket(payload);

    socket.onopen = () => {
      dispatch(wsSuccess());
    };

    socket.onerror = () => {
      dispatch(wsError());
    };

    socket.onmessage = (event) => {
      const { data } = event;
      const parsedData = JSON.parse(data);

      dispatch(wsOnMessage(parsedData));
    };

    socket.onclose = () => {
      dispatch(wsClose());
    };
  }

  if (type === wsDisconnect.type && socket) {
    socket.close();
    socket = null;
  }

  return next(action);
};
