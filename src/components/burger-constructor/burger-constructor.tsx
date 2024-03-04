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
  getConstructorItems,
} from "../../services/ingredients/selectors";

import { useCreateOrderMutation } from "../../services/api/order.api";
import { useNavigate } from "react-router-dom";
import { TCreateOrder } from "../../types/types";
import { getLoginStatus } from "../../services/user/selectors";

function BurgerConstructor() {
  const { bun } = useSelector(getConstructorItems);
  const isLoggedIn = useSelector(getLoginStatus);
  const navigate = useNavigate();

  const [createOrder] = useCreateOrderMutation();

  const totalPrice = useSelector(getPrice);
  const ingredientsIds = useSelector(getConstructorItemsIds);

  const handlePostOrder = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    createOrder(ingredientsIds).then(
      (res: { data: TCreateOrder } | { error: string }) => {
        if ("data" in res) {
          const data = res.data;
          const orderNumber = data.order.number;
          navigate(`order/${orderNumber}`);
        }
      }
    );
  };

  return (
    <>
      <section className={`${styles.constructor} mt-25 pr-4 pl-4`}>
        <IngredientsList />
        {bun && (
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
        )}
      </section>
    </>
  );
}

export default BurgerConstructor;
