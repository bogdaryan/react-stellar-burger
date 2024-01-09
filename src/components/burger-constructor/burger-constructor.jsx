import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import IngredientsList from "./ingredients-list/ingredients-list";

import { getOrderRequest } from "../../services/order/orderApi";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import currencyIcon from "../../images/currency_icon.svg";
import styles from "./burger-constructor.module.css";

import {
  getPrice,
  getConstructorItemsIds,
} from "../../services/ingredients/selectors";

function BurgerConstructor({ scrollHeight }) {
  const dispatch = useDispatch();
  const totalPrice = useSelector(getPrice);
  const ids = useSelector(getConstructorItemsIds);

  const handlePostOrder = () => {
    if (!ids) return;

    dispatch(getOrderRequest(ids));
  };

  return (
    <section className={`${styles.constructor} mt-25 pr-4 pl-4`}>
      <IngredientsList scrollHeight={scrollHeight} />
      <div className={`${styles.wrapper} pt-10`}>
        <div className={`${styles.price} mr-10`}>
          <p className="text text_type_digits-medium">{totalPrice || 0}</p>
          <img src={currencyIcon} alt="Иконка валюты" />
        </div>
        <Button
          onClick={handlePostOrder}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  scrollHeight: PropTypes.number,
};

export default BurgerConstructor;
