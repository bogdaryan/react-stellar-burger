import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import style from "./ingredient.module.css";

import { ingredientPropType } from "../../../utils/prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerIngredientContext } from "../../../utils/appContext";
import { addIngredient } from "../../../services/actions";

function Ingredient({ ingredientDetails }) {
  const { name, price, image } = ingredientDetails;
  const { store, dispatch } = useContext(BurgerIngredientContext);
  const [count, setCount] = useState(null);

  const updatedIngredient = {
    ...ingredientDetails,
    _idConstructor: uuidv4(),
  };

  useEffect(() => {
    countIngredients();
  }, [store.ingredients]);

  useEffect(() => {
    bunCount(ingredientDetails);
  }, [store.bun]);

  const countIngredients = () => {
    const counter = {};

    store.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.name;
      counter[ingredientName] = (counter[ingredientName] || 0) + 1;
    });

    const ingredientCount = counter[name];
    setCount(ingredientCount);
  };

  const bunCount = (selectedIngredient) => {
    if (selectedIngredient.type !== "bun" || !store.bun) return;
    const selectedBun = selectedIngredient;

    setCount(null);

    if (store.bun._id === selectedBun._id) {
      setCount(1);
    }
  };

  return (
    <li
      className={`${style.card} noselect mb-8`}
      onClick={() => dispatch(addIngredient(updatedIngredient))}
    >
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
};

export default Ingredient;
