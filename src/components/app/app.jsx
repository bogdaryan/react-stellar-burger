import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

// Style //
import styles from "./app.module.css";

import { setUser } from "../../services/user/user";

// Components //
import Header from "../app-header/app-header";
import { useGetIngredientsQuery } from "../../services/api/ingredients.api";
import { useGetUserQuery } from "../../services/api/user.api";

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useGetUserQuery();
  useGetIngredientsQuery();

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
};

export default App;
