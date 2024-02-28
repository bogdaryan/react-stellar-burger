import { useEffect } from "react";
import { useDispatch } from "../../hooks/hooks";
import { Outlet } from "react-router-dom";

import styles from "./app.module.css";

import Header from "../app-header/app-header";
import { useGetIngredientsQuery } from "../../services/api/ingredients.api";
import { useGetUserQuery } from "../../services/api/user.api";

import { setUser } from "../../services/user/userSlice";
import { TUser } from "../../types/types";

function App() {
  const dispatch = useDispatch();
  const user: TUser = JSON.parse(localStorage.getItem("user") as string);

  useGetUserQuery(null);
  useGetIngredientsQuery(null);

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  return (
    <>
      <Header />
      <main className={`${styles.main} pd-10`}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
