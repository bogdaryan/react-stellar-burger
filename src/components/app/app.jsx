import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { getUser as getUserApi } from "../../utils/api";

// Style //
import styles from "./app.module.css";

import { getIngredientsRequest } from "../../services/ingredients/ingredientsApi";

import { setUser } from "../../services/auth/user";

// Components //
import Header from "../app-header/app-header";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getIngredientsRequest());
    getUserApi();

    if (user) {
      dispatch(setUser(user));
    }
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
