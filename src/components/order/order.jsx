import styles from "./order.module.css";

import IngredientImg from "../ingredient-img/ingredient-img";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef } from "react";

export const Order = (props) => {
  const {
    createdAt,
    name,
    number,
    ingredients,
    price,
    hiddenIngredients,
    statusDetails,
  } = props.orderDetails;

  const { isUserHistoryOrder } = props;

  const ingredientsListRef = useRef();

  const setAttribute = () => {
    if (hiddenIngredients?.length === 0 || !hiddenIngredients) return;
    const ingredients = ingredientsListRef.current.childNodes;
    const lastIngredient = ingredients[ingredients.length - 1];

    lastIngredient.setAttribute("data-count", `+${hiddenIngredients?.length}`);
    lastIngredient.classList.add(styles.countHidden);
  };

  /* eslint-disable */
  useEffect(() => {
    setAttribute();
  }, []);
  /* eslint-enable */

  return (
    <div className={styles.order}>
      <div className={styles.header}>
        <p className={`${styles.number} text text_type_digits-default`}>
          {`#${number}`} <br />
        </p>
        <p className={`${styles.date} text text_type_main-default`}>
          <FormattedDate date={new Date(createdAt)} />
        </p>
      </div>

      <div className="mt-6">
        <p className={`${styles.title}  text text_type_main-medium`}>{name}</p>
        {isUserHistoryOrder && (
          <p
            className={`${statusDetails.className} text text_type_main-default mt-2`}
          >
            {statusDetails.title}
          </p>
        )}
      </div>

      <div className={`${styles.footer} mt-6`}>
        <div className={styles.ingredientsList} ref={ingredientsListRef}>
          {ingredients.map((ingredient, idx) => {
            return <IngredientImg ingredientDetails={ingredient} key={idx} />;
          })}
        </div>

        <div className={styles.priceWrapper}>
          <p className={`${styles.price} text text_type_digits-default`}>
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
