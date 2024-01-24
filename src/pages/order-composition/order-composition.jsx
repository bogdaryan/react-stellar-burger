import styles from "./order-composition.module.css";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImg from "../../components/ingredient-img/ingredient-img";
import { nanoid } from "@reduxjs/toolkit";

const OrderComposition = () => {
  const order = JSON.parse(localStorage.getItem("order"));
  const {
    number,
    name,
    price,
    statusDetails,
    ingredients,
    createdAt,
    counters,
  } = order;

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <p className="text text_type_digits-default">{number}</p>
        <p className="text text_type_main-medium mt-10 mb-3">{name}</p>
        <p
          className={`${statusDetails.className} text text_type_main-default mb-15`}
        >
          {statusDetails.title}
        </p>
        <p className={`${styles.listTitle} text text_type_main-medium mb-6`}>
          Состав:
        </p>
        <ul className={`${styles.list} custom-scroll mr-6`}>
          {ingredients.map((ingredient) => {
            const { name, price } = ingredient;
            return (
              <li className={styles.ingredient} key={nanoid()}>
                <IngredientImg
                  ingredientDetails={ingredient}
                  className={styles.ingredientImg}
                  classNameModal={styles.ingredientModal}
                />
                <p className="text text_type_main-default ml-4">{name}</p>
                <div className={styles.countPrice}>
                  <p className="text text_type_digits-default">
                    <span>{counters[name]}</span> x <span>{price}</span>
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
};

export default OrderComposition;
