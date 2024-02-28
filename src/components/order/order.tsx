import styles from "./order.module.css";
import IngredientImg from "../ingredient-img/ingredient-img";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect, useRef } from "react";
import { TOrderDetails } from "../../types/types";
import { Link } from "react-router-dom";

type Props = {
  orderDetails: TOrderDetails;
  isUserHistoryOrder?: boolean;
};

export function Order(props: Props) {
  const { isUserHistoryOrder } = props;
  const { orderDetails } = props;
  const {
    createdAt,
    name,
    number,
    ingredients,
    price,
    hiddenIngredients,
    statusDetails,
  } = orderDetails;

  const ingredientsListRef = useRef<HTMLDivElement>(null);

  function setNumberHiddenIngredients() {
    if (hiddenIngredients?.length === 0 || !hiddenIngredients) return;

    const lastIngredient = ingredientsListRef.current!.lastElementChild;

    if (lastIngredient) {
      lastIngredient.setAttribute(
        "data-count",
        `+${hiddenIngredients?.length}`
      );
      lastIngredient.classList.add(styles.countHidden);
    }
  }

  function setOrderDetailsToLocalStorage() {
    localStorage.setItem("order", JSON.stringify(orderDetails));
  }

  /* eslint-disable */
  useEffect(() => {
    setNumberHiddenIngredients();
  }, [ingredientsListRef]);
  /* eslint-enable */

  return (
    <Link
      to={`${number}`}
      className={styles.link}
      onClick={setOrderDetailsToLocalStorage}
    >
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
          <p className={`${styles.title}  text text_type_main-medium`}>
            {name}
          </p>
          {isUserHistoryOrder && (
            <p
              className={`${
                statusDetails!.className
              } text text_type_main-default mt-2`}
            >
              {statusDetails!.title}
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
    </Link>
  );
}

export function UserOrder({ orderDetails }: Props) {
  return <Order orderDetails={orderDetails} isUserHistoryOrder={true} />;
}

export function PublicOrder({ orderDetails }: Props) {
  return <Order orderDetails={orderDetails} />;
}
