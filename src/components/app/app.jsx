import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { getUser } from "../../utils/api";

// Style //
import styles from "./app.module.css";

//
import { getIngredientsRequest } from "../../services/ingredients/ingredientsApi";

import { setUser } from "../../services/auth/user";

// Components //
import Header from "../app-header/app-header";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsRequest());

    getUser().then((res) => {
      dispatch(setUser(res.data.user));
    });
  }, [dispatch]);

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
