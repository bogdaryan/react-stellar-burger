import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { getUser, getNewToken } from "../../utils/api";

// Style //
import styles from "./app.module.css";

//
import { getIngredientsRequest } from "../../services/ingredients/ingredientsApi";

import { setUser } from "../../services/auth/user";

// Components //
import Header from "../app-header/app-header";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

import {
  getOrderNumber,
  getStatusModalOrderDetails,
} from "../../services/order/selectors";

import {
  getIngredientDetails,
  getStatusModalIngredientDetails,
} from "../../services/ingredients/selectors";

function App() {
  const dispatch = useDispatch();
  const orderNumber = useSelector(getOrderNumber);
  const ingredientDetails = useSelector(getIngredientDetails);
  const isOpenedOrderDetails = useSelector(getStatusModalOrderDetails);
  const isOpenedIngredientDetails = useSelector(
    getStatusModalIngredientDetails
  );

  useEffect(() => {
    dispatch(getIngredientsRequest());

    // getUser();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={`${styles.main} pd-10`}>
        <Outlet />
      </main>

      {isOpenedOrderDetails && orderNumber && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}

      {isOpenedIngredientDetails && ingredientDetails && (
        <Modal>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
