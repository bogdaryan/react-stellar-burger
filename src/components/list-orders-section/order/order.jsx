import styles from "./order.module.css";

import Ingredient from "../../ingredient-img/ingredient";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Order = () => {
  return (
    <li className={styles.order}>
      <p className={`${styles.number} text text_type_digits-default`}>
        #034534
      </p>
      <p className={`${styles.date} text text_type_main-default`}>
        Сегодня, 13:20 i-GMT+3
      </p>
      <p className={`${styles.title} text text_type_main-medium`}>
        Interstellar бургер
      </p>
      <div className={styles.ingredientsList}>
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
      </div>
      <div className={styles.wrapperPrice}>
        <p className={`${styles.price} text text_type_digits-default`}>560</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  );
};

export default Order;
