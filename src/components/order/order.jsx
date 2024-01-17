import styles from "./order.module.css";

import Ingredient from "../ingredient-img/ingredient";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const Order = (props) => {
  const { isUserHistoryOrder } = props;
  const { createdAt, name, number, status } = props;

  return (
    <div className={styles.order}>
      <div className={styles.header}>
        <p className={`${styles.number} text text_type_digits-default`}>
          {`#${number}`}
        </p>
        <p className={`${styles.date} text text_type_main-default`}>
          {createdAt}
        </p>
      </div>

      <div className={`${styles.main} mt-6`}>
        <p className={`${styles.title} text text_type_main-medium`}>{name}</p>
        {isUserHistoryOrder && (
          <p className="text text_type_main-default mt-2">{status}</p>
        )}
      </div>

      <div className={`${styles.footer} mt-6`}>
        <div className={styles.ingredientsList}>
          {}
          <Ingredient image={"image"} name={"name"} />;
          <Ingredient image={"image"} name={"name"} />;
          <Ingredient image={"image"} name={"name"} />;
          <Ingredient image={"image"} name={"name"} />;
        </div>

        <div className={styles.priceWrapper}>
          <p className={`${styles.price} text text_type_digits-default`}>560</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
