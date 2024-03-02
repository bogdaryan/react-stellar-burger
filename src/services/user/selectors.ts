import { RootStore } from "../index";

export const getUser = (store: RootStore) => store.user.user;
export const getLoginStatus = (store: RootStore) => store.user.isLoggedIn;
