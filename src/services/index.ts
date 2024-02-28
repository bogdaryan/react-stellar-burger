import { configureStore, combineReducers } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";

import ingredientsConstructor from "./ingredients/ingredientsConstructorSlice";
import ingredients from "./ingredients/ingredientsSlice";
import ingredientDetails from "./ingredients/ingredientDetailsSlice";
import modal from "./modal/modalSlice";
import user from "./user/userSlice";
import wsFeed from "./websoket/wsFeedSlice";
import wsUserOrderFeed from "./websoket/wsUserFeedSlice";
import orderStatus from "./order/ordersStatusSlice";

import { api } from "./api/api";

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

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      saga,
      api.middleware
    ),
});

saga.run(rootSaga);

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
