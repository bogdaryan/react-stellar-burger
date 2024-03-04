import { configureStore, combineReducers } from "@reduxjs/toolkit";

import ingredientsConstructor from "./ingredients/ingredientsConstructorSlice";
import ingredients from "./ingredients/ingredientsSlice";
import ingredientDetails from "./ingredients/ingredientDetailsSlice";
import modal from "./modal/modalSlice";
import user from "./user/userSlice";
import wsFeed from "./websoket/wsFeedSlice";
import wsUserOrderFeed from "./websoket/wsUserFeedSlice";
import orderStatus from "./order/ordersStatusSlice";

import { api } from "./api/api";

import { socketMiddleware } from "./websoket/socketMiddleware";

const rootReducer = combineReducers({
  ingredients: ingredients,
  ingredientsConstructor: ingredientsConstructor,
  modal: modal,
  ingredientDetails: ingredientDetails,
  user: user,
  wsFeed: wsFeed,
  wsUserOrderFeed: wsUserOrderFeed,
  orderStatus: orderStatus,
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      api.middleware,
      socketMiddleware
    ),
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
