import styles from "./order-composition.module.css";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImg from "../../components/ingredient-img/ingredient-img";
import { useMemo } from "react";
import { TOrderDetails } from "../../types/types";

function OrderComposition() {
  const order: TOrderDetails = useMemo(
    () => JSON.parse(localStorage.getItem("order") as string),
    []
  );

  const {
    number,
    name,
    price,
    statusDetails,
    ingredients,
    createdAt,
    counters,
  } = order;

  const uniqueIngredients = Array.from(
    new Set(ingredients.map((obj) => JSON.stringify(obj)))
  ).map((str) => JSON.parse(str));

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <p className="text text_type_digits-default">{number}</p>
        <p className="text text_type_main-medium mt-10 mb-3">{name}</p>
        <p
          className={`${
            statusDetails!.className
          } text text_type_main-default mb-15`}
        >
          {statusDetails!.title}
        </p>
        <p className={`${styles.listTitle} text text_type_main-medium mb-6`}>
          Состав:
        </p>
        <ul className={`${styles.list} custom-scroll mr-6`}>
          {uniqueIngredients.map((ingredient, idx) => {
            const { name, price } = ingredient;
            return (
              <li className={styles.ingredient} key={idx}>
                <IngredientImg
                  ingredientDetails={ingredient}
                  classNameModal={styles.ingredientModal}
                />
                <p className="text text_type_main-default ml-4">{name}</p>
                <div className={styles.countPrice}>
                  <p className="text text_type_digits-default">
                    <span>{counters![name]}</span> x <span>{price}</span>
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={`${styles.footer} mt-10`}>
          <p className="text text_type_main-default">
            <FormattedDate date={new Date(createdAt)} />
          </p>
          <div className={styles.totalWrapper}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderComposition;
