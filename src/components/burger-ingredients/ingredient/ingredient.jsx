import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import style from "./ingredient.module.css";

import { addIngredient } from "../../../services/ingredientsSlice";
// import { showIngredientDetails } from "../../../services/modalSlice";

import { ingredientPropType } from "../../../utils/prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Ingredient({ ingredientDetails, counter }) {
  const dispatch = useDispatch();
  const { name, price, image } = ingredientDetails;

  const onClick = () => {
    const updatedIngredient = {
      ...ingredientDetails,
      _key: nanoid(),
    };

    dispatch(addIngredient(updatedIngredient));
    // dispatch(showIngredientDetails(updatedIngredient));
  };

  return (
    <li
      className={`${style.card} noselect mb-8`}
      onClick={onClick}
      draggable={true}
    >
      {counter[name] && (
        <Counter count={counter[name]} size="default" extraClass="m-1" />
      )}
      <img className={`${style.img} ml-1 mt-1`} src={image} alt={name} />
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
  counter: PropTypes.object,
};

export default Ingredient;
