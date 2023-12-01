import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Style //
import style from "./app.module.css";

// API //
import { fetchIngredients } from "../../asyncActions/fetchIngredients";

// Components //
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
  const dispatch = useDispatch();
  const isOpened = useSelector((store) => store.modal.isOpened);
  const ingredientDetails = useSelector(
    (store) => store.modal.ingredientDetails
  );

  const ingredients = useSelector((store) => store.ingredients.menu);
  const bun = useSelector((store) => store.ingredients.bun);

  const orderNumber = useSelector((store) => store.modal.orderNumber);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
      <Header />
      <main className={`${style.main} pd-10`}>
        {ingredients && <BurgerIngredients />}
        {bun && <BurgerConstructor />}

        {isOpened && orderNumber && (
          <Modal>
            <OrderDetails />
          </Modal>
        )}

        {isOpened && ingredientDetails && (
          <Modal>
            <IngredientDetails />
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
