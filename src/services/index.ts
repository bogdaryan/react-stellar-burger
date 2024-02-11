import { configureStore, combineReducers } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";

import ingredientsConstructor from "./ingredients/ingredientsConstructor";
import ingredients from "./ingredients/ingredients";
import ingredientDetails from "./ingredients/ingredientDetails";
import modal from "./modal/modal";
import user from "./user/user";
import wsFeed from "./websoket/wsFeed";
import wsUserOrderFeed from "./websoket/wsUserOrderFeed";
import orderStatus from "./order/ordersNumberStatus";

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

export default store;
