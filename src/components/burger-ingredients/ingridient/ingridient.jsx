import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./ingridient.module.css";

function Ingridient({ image, price, title, count }) {
  return (
    <li className={`${style.card} pb-8 noselect`}>
      {count && <Counter count={count} size="default" extraClass="m-1" />}
      <img className="ml-1 mt-1" src={image} alt={title} />
      <div className={`${style.wrapper} mt-1 mb-1`}>
        <p className={`${style.price} text text_type_digits-default mr-2`}>
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{title}</p>
    </li>
  );
}

export default Ingridient;
