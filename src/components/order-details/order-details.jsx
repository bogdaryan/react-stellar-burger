import { useSelector, useDispatch } from "react-redux";
import { setOpened } from "../../services/modal/modal";

import done from "../../images/done-icon-order-details.svg";
import styles from "./order-details.module.css";

import { getOrderNumber } from "../../services/order/selectors";

function OrderDetails() {
  const orderNumber = useSelector(getOrderNumber);
  const dispatch = useDispatch();

  return (
    <div className={`${styles.order} pt-30 pb-30`}>
      <h2 className={`${styles.number} text text_type_digits-large`}>
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img
        className={`${styles.img} mt-15 mb-15`}
        src={done}
        alt="Поддвердить"
        onClick={() => dispatch(setOpened(false))}
      />
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.text} text text_type_main-small`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
