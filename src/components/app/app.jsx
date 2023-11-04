import { useEffect, useState, useCallback, createRef } from "react";
import { createPortal } from "react-dom";

import axios from "axios";

import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

import style from "./app.module.css";
import { URL, PORTAL_ROOT } from "../../utils/constants.js";

function App() {
  const [state, setState] = useState({
    bun: null,
    constructorElements: [],
  });

  useEffect(() => {
    axios
      .get(URL)
      .then(({ data }) => setState({ ...state, ingredients: data.data }))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const closeModal = () => {
    setSelectedIngredient(null);
    setIsModalOpen(false);
  };
  const showModal = () => setIsModalOpen(true);

  const getCurrentIngredient = (el) => {
    setSelectedIngredient(el);
    setIsModalOpen(true);
  };

  function IngredientDetailsPortal() {
    if (!isModalOpen || !selectedIngredient) {
      return null;
    }

    const { name, image_large, calories, proteins, fat, carbohydrates } =
      selectedIngredient;

    return createPortal(
      <Modal closeModal={closeModal}>
        <IngredientDetails
          name={name}
          image={image_large}
          calories={calories}
          proteins={proteins}
          fat={fat}
          carbohydrates={carbohydrates}
        />
      </Modal>,
      PORTAL_ROOT
    );
  }

  function OrderDetailsPortal() {
    if (!isModalOpen || selectedIngredient !== null) {
      return null;
    }

    return createPortal(
      <Modal closeModal={closeModal}>
        <OrderDetails closeModal={closeModal} />
      </Modal>,
      PORTAL_ROOT
    );
  }

  return (
    <>
      <Header />
      <main className={`${style.main} pd-10`}>
        {state.ingredients && (
          <>
            <BurgerIngredients
              ingredients={state.ingredients}
              getCurrentIngredient={getCurrentIngredient}
            />
            <BurgerConstructor showModal={showModal} />
          </>
        )}
        <IngredientDetailsPortal />
        <OrderDetailsPortal />
      </main>
    </>
  );
}

export default App;
