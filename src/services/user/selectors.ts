import { RootStore } from "../index";

export const getUser = (store: RootStore) => store.user.user;
