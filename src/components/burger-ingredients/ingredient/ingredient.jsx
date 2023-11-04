import React, { useState, useEffect } from "react";
import PropTypes, { func } from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../../utils/prop-types";
import style from "./ingredient.module.css";

function Ingredient({ ingredientDetails, count, getCurrentIngredient }) {
  const { name, price, image } = ingredientDetails;

  const targetIngredient = () => {
    getCurrentIngredient(ingredientDetails);
  };

  return (
    <li className={`${style.card} noselect mb-8`} onClick={targetIngredient}>
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

Ingredient.propTypes = {
  ingredientDetails: ingredientPropType.isRequired,
  count: PropTypes.number,
};

export default Ingredient;
