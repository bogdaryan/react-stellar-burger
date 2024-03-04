import type { RootStore } from "../index";

export const getOrdersDone = (store: RootStore) => store.orderStatus.ordersDone;
export const getOrdersPending = (store: RootStore) =>
  store.orderStatus.ordersPending;
