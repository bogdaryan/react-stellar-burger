import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

// Style //
import style from "./app.module.css";

// API //
import { getIngredientsRequest } from "../../services/ingredientsApiSlice";

// Components //
import Header from "../app-header/app-header";
// import Home from "../../pages/home/home";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
  const dispatch = useDispatch();
  const isOpenedOrderDetails = useSelector((store) => store.order.isOpened);
  const isOpenedIngredientDetails = useSelector(
    (store) => store.ingredientDetails.isOpened
  );
  const orderNumber = useSelector((store) => store.order.orderNumber);

  const ingredientDetails = useSelector(
    (store) => store.ingredientDetails.ingredientDetails
  );

  useEffect(() => {
    dispatch(getIngredientsRequest());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={`${style.main} pd-10`}>
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
