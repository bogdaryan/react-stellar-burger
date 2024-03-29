import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction("wsFeed/wsConnect", (url) => {
  return { payload: url };
});
export const wsDisconnect = createAction("wsFeed/wsDisconnect");
export const wsSuccess = createAction("wsFeed/wsSuccess");
export const wsError = createAction("wsFeed/wsError");
export const wsClose = createAction("wsFeed/wsClose");
export const wsOnMessage = createAction("wsFeed/wsOnMessage");
export const wsSendMessage = createAction("wsFeed/wsSendMessage");

export const wsActions = {
  wsConnect,
  wsDisconnect,
  wsSuccess,
  wsError,
  wsClose,
  wsOnMessage,
  wsSendMessage,
};
