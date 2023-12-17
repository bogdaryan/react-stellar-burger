import { useState } from "react";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

import styles from "./home.module.css";

const Home = () => {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredientsApi
  );

  const [scrollHeight, setScrollHeight] = useState(0);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {ingredientsFailed ? (
          <p className={`${styles.error} text text_type_main-large`}>
            Произошла ошибка при получении данных
          </p>
        ) : ingredientsRequest ? (
          <Box className={styles.loading}>
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
    </>
  );
};

export default Home;
