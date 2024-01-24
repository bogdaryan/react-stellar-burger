import { configureStore, combineReducers } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";

import ingredients from "./ingredients/ingredients";
import ingredientDetails from "./ingredients/ingredientDetails";
import modal from "./modal/modal";
import register from "./auth/registerApi";
import login from "./auth/loginApi";
import logout from "./auth/logoutApi";
import forgotPasswordApi from "./auth/forgotPasswordApi";
import resetPasswordApi from "./auth/resetPasswordApi";

import ingredientsApi from "./ingredients/ingredientsApi";
import orderApi from "./order/orderApi";
import user from "./auth/user";
import editUser from "./auth/editUser";

import wsFeed from "./websoket/wsFeed";
import wsUserOrderFeed from "./websoket/wsUserOrderFeed";
import orderStatus from "./order/ordersNumberStatus";

const rootReducer = combineReducers({
  ingredientsApi: ingredientsApi,
  ingredients: ingredients,
  modal: modal,
  order: orderApi,
  ingredientDetails: ingredientDetails,
  user: user,
  register: register,
  login: login,
  logout: logout,
  forgotPassword: forgotPasswordApi,
  resetPassword: resetPasswordApi,
  editUser: editUser,
  wsFeed: wsFeed,
  wsUserOrderFeed: wsUserOrderFeed,
  orderStatus: orderStatus,
});

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware: [saga],
});

saga.run(rootSaga);

export default store;
