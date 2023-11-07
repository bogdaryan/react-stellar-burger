import React, { useEffect, useState } from "react";
import style from "./app.module.css";
import getIngredients from "../../utils/burger-api";

import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
  const [ingredients, setIngredients] = useState();
  const [isOpened, setIsOpened] = useState(false);
  const [ingredient, setIngredient] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    getIngredients()
      .then((data) => setIngredients(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const closeModal = () => {
    setIsOpened(true);
    setIngredient(null);
    setOrderDetails(null);
  };

  const getCurrentIngredient = (item) => {
    setIngredient(item);
    setIsOpened(true);
  };

  const showOrderDetails = () => {
    setOrderDetails(true);
    setIsOpened(true);
  };

  return (
    <>
      <Header />
      <main className={`${style.main} pd-10`}>
        {ingredients && (
          <>
            <BurgerIngredients
              ingredients={ingredients}
              getCurrentIngredient={getCurrentIngredient}
            />
            <BurgerConstructor openOrderDetails={() => showOrderDetails()} />
          </>
        )}

        {isOpened && ingredient && (
          <Modal close={closeModal}>
            <IngredientDetails ingredient={ingredient} />
          </Modal>
        )}

        {isOpened && ingredient === null && orderDetails && (
          <Modal close={closeModal}>
            <OrderDetails close={() => closeModal()} />
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
