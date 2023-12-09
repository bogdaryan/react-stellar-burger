import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Style //
import style from "./app.module.css";

// API //
import { getIngredientsRequest } from "../../services/ingredientsApiSlice";

// Components //
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

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

  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredientsApi
  );

  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    dispatch(getIngredientsRequest());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={`${style.main} pd-10`}>
        <DndProvider backend={HTML5Backend}>
          {ingredientsFailed ? (
            <p className={`${style.error} text text_type_main-large`}>
              Произошла ошибка при получении данных
            </p>
          ) : ingredientsRequest ? (
            <Box className={style.loading}>
              <CircularProgress size={100} />
            </Box>
          ) : (
            <BurgerIngredients
              setScrollHeight={setScrollHeight}
              scrollHeight={scrollHeight}
            />
          )}

          <BurgerConstructor scrollHeight={scrollHeight} />
        </DndProvider>
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
