import { createAction } from "@reduxjs/toolkit";

export const wsConectionStart = createAction("wsFeed/wsConectionStart");
export const wsDisconect = createAction("wsFeed/wsDisconect");
export const wsConnectionSuccess = createAction("wsFeed/wsConnectionSuccess");
export const wsConnectionError = createAction("wsFeed/wsConnectionError");
export const wsConnectionClosed = createAction("wsFeed/wsConnectionClosed");
export const wsOnMessage = createAction("wsFeed/wsOnMessage");
export const wsSendMessage = createAction("wsFeed/wsSendMessage");
