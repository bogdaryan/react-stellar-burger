import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import { RootStore, AppDispatch } from "../services";

export const useSelector: TypedUseSelectorHook<RootStore> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
