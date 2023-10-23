import style from "./app.module.css";
import { data } from "../../utils/data";
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <>
      <Header />
      <main className={`${style.main} mb-10`}>
        <BurgerIngredients data={data} />
        {/* <BurgerConstructor /> */}
      </main>
    </>
  );
}

export default App;
