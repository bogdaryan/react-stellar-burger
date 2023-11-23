import React, { useEffect, useState } from "react";
import style from "./app.module.css";
import { getIngredients, postOrder } from "../../utils/burger-api";

import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

import {
  BurgerIngredientContext,
  BurgerIngredientsContext,
} from "../../utils/appContext";
import useIngredientReducer from "../../services/reducerIngredients";
import { clearConstructor } from "../../services/actions";

function App() {
  const [ingredients, setIngredients] = useState();
  const [totalPrice, setTotalPrice] = useState([]);

  const [isOpened, setIsOpened] = useState(false);

  const [orderDetails, setOrderDetails] = useState({
    loading: false,
    error: false,
    number: null,
  });

  const [store, dispatch] = useIngredientReducer();

  useEffect(() => {
    getIngredients()
      .then((data) => setIngredients(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const closeModal = () => {
    setIsOpened(false);
  };

  const showOrderDetails = () => {
    const ingredientsIds = [...store.ingredients, store.bun, store.bun].map(
      (el) => el._id
    );

    setOrderDetails({ ...orderDetails, loading: true });

    postOrder(ingredientsIds)
      .then((res) => {
        if (res.success) {
          setOrderDetails({ ...orderDetails, number: res.order.number });
          setIsOpened(true);
          dispatch(clearConstructor());
        }
      })
      .catch((error) => {
        setOrderDetails({ ...orderDetails, error: true, loading: false });
        throw new Error(error);
      });
  };

  return (
    <>
      <Header />
      <main className={`${style.main} pd-10`}>
        <BurgerIngredientContext.Provider value={{ store, dispatch }}>
          <BurgerIngredientsContext.Provider value={ingredients}>
            {ingredients && <BurgerIngredients />}

            {store.bun && (
              <BurgerConstructor
                openOrderDetails={() => showOrderDetails()}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
              />
            )}
          </BurgerIngredientsContext.Provider>
        </BurgerIngredientContext.Provider>

        {!orderDetails.loading && isOpened && (
          <Modal close={closeModal}>
            <OrderDetails
              close={() => closeModal()}
              orderNumber={orderDetails.number}
            />
          </Modal>
        )}

        {false && (
          <Modal close={closeModal}>
            <IngredientDetails />
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
