import { configureStore, combineReducers } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";

import ingredientsSlice from "./ingredientsSlice";
import ingredientDetailsSlice from "./ingredientDetailsSlice";
import modalSlice from "./modalSlice";

import ingredientsApiSlice from "./ingredientsApiSlice";
import orderApiSlice from "./orderApiSlice";

const rootReducer = combineReducers({
  ingredientsApi: ingredientsApiSlice,
  ingredients: ingredientsSlice,
  modal: modalSlice,
  order: orderApiSlice,
  ingredientDetails: ingredientDetailsSlice,
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
