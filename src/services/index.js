import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import toolkitSliceIngredients from "./ingredientsSlice";
import modalSlice from "./modalSlice";

const rootReducer = combineReducers({
  ingredients: toolkitSliceIngredients,
  modal: modalSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});
