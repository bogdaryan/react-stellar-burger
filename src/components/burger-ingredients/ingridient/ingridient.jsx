import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../../utils/prop-types";
import style from "./ingridient.module.css";

function Ingridient({ data, count }) {
  const { name, price, image } = data;

  return (
    <li className={`${style.card} noselect mb-8`}>
      {count && <Counter count={count} size="default" extraClass="m-1" />}
      <img className="ml-1 mt-1" src={image} alt={name} />
      <div className={`${style.wrapper} mt-1 mb-1`}>
        <p className={`${style.price} text text_type_digits-default mr-2`}>
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </li>
  );
}

Ingridient.propTypes = ingredientPropType;

export default Ingridient;
