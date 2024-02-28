import { useSelector } from "../../hooks/hooks";

import IngredientsList from "./ingredients-list/ingredients-list";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

import {
  getPrice,
  getConstructorItemsIds,
} from "../../services/ingredients/selectors";

import { useCreateOrderMutation } from "../../services/api/order.api";
import { Outlet, useNavigate } from "react-router-dom";
import { TCreateOrder } from "../../types/types";

function BurgerConstructor() {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();

  const totalPrice = useSelector(getPrice);
  const ids = useSelector(getConstructorItemsIds);

  const handlePostOrder = () => {
    if (!ids) return;

    createOrder(ids).then((res: { data: TCreateOrder } | { error: any }) => {
      if ("data" in res) {
        const data = res.data;
        const orderNumber = data.order.number;
        navigate(`order/${orderNumber}`);
      }
    });
  };

  return (
    <>
      <section className={`${styles.constructor} mt-25 pr-4 pl-4`}>
        <IngredientsList />
        <div className={`${styles.wrapper} pt-10`}>
          <div className={`${styles.price} mr-10`}>
            <p className="text text_type_digits-medium">{totalPrice || 0}</p>
            <CurrencyIcon type="primary" />
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
      <Outlet />
    </>
  );
}

export default BurgerConstructor;
