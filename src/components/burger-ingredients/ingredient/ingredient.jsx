import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import { addIngredient } from "../../../services/ingredientsSlice";

import style from "./ingredient.module.css";

import { ingredientPropType } from "../../../utils/prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { showIngredientDetails } from "../../../services/modalSlice";

function Ingredient({ ingredientDetails, counter }) {
  const dispatch = useDispatch();
  const { name, price, image } = ingredientDetails;

  return (
    <li
      className={`${style.card} noselect mb-8`}
      onClick={() => {
        const updatedIngredinet = {
          ...ingredientDetails,
          _idConstructor: nanoid(),
        };

        dispatch(addIngredient(updatedIngredinet));
        dispatch(showIngredientDetails(updatedIngredinet));
      }}
      draggable={true}
    >
      {counter[name] && (
        <Counter count={counter[name]} size="default" extraClass="m-1" />
      )}
      <img className={`${style.img} ml-1 mt-1`} src={image} alt={name} s />
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
  count: PropTypes.object,
};

export default Ingredient;
