import styles from "./order.module.css";

import Ingredient from "../ingredient-img/ingredient";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Order = (props) => {
  const { createdAt, name, number, ingredients, price, hiddenIngredients } =
    props.orderDetails;

  const { isUserHistoryOrder } = props;
  let { status } = props;
  let classNameStatus;

  switch (status) {
    case "done":
      classNameStatus = styles.done;
      status = "Выполнен";
      break;

    case "canceled":
      classNameStatus = styles.cancel;
      status = "Отменен";
      break;
    case "generated":
    case "pending":
      classNameStatus = styles.pending;
      status = "Готовится";
      break;
    default:
      break;
  }

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
          <p className={`${classNameStatus} text text_type_main-default mt-2`}>
            {status}
          </p>
        )}
      </div>

      <div className={`${styles.footer} mt-6`}>
        <div className={styles.ingredientsList}>
          {ingredients.map((ingredient, idx) => {
            return <Ingredient ingredientDetails={ingredient} key={idx} />;
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
