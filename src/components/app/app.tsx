import { Outlet } from "react-router-dom";

import styles from "./app.module.css";

import Header from "../app-header/app-header";
import { useGetIngredientsQuery } from "../../services/api/ingredients.api";
import { useGetUserQuery } from "../../services/api/user.api";

function App() {
  useGetUserQuery(null);
  const { isSuccess } = useGetIngredientsQuery(null);

  return (
    isSuccess && (
      <>
        <Header />
        <main className={`${styles.main} pd-10`}>
          <Outlet />
        </main>
      </>
    )
  );
}

export default App;
