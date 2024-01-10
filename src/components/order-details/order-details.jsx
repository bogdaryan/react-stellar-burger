import { useSelector } from "react-redux";
import done from "../../images/done-icon-order-details.svg";
import styles from "./order-details.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { getOrderRequestStatus } from "../../services/order/selectors";

function OrderDetails() {
  const navigate = useNavigate();
  const { orderNumber } = useSelector(getOrderRequestStatus);
  const { number } = useParams();

  return (
    <>
      <div className={`${styles.order} pt-30 pb-30`}>
        <h2 className={`${styles.number} text text_type_digits-large`}>
          {number}
        </h2>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <img
          className={`${styles.img} mt-15 mb-15`}
          src={done}
          alt="Поддвердить"
          onClick={() => navigate(-1)}
        />
        <p className="text text_type_main-small mb-2">
          Ваш заказ начали готовить
        </p>
        <p className={`${styles.text} text text_type_main-small`}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
}

export default OrderDetails;
