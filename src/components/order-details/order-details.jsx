import React from "react";
import done from "../../images/done-icon-order-details.svg";
import style from "./order-details.module.css";

function OrderDetails({ closeModal }) {
  const handleCloseModal = () => closeModal();

  return (
    <div className={`${style.order} pt-30 pb-30`}>
      <h2 className={`${style.number} text text_type_digits-large`}>034536</h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img
        className={`${style.img} mt-15 mb-15`}
        src={done}
        alt="Поддвердить"
        onClick={handleCloseModal}
      />
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className={`${style.text} text text_type_main-small`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
