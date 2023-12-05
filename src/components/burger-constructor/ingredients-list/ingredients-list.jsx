import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { nanoid } from "@reduxjs/toolkit";

import {
  deleteIngredient,
  addIngredient,
} from "../../../services/ingredientsSlice";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import Bun from "../bun/bun.module";
import TemplateIngredient from "../template-ingredient/template-ingredient";

import style from "./ingredients-list.module.css";
import listStyleImage from "../../../images/burger-constructor-list-marker.svg";

const IngredientsList = () => {
  const dispatch = useDispatch();
  const constructorIngredients = useSelector(
    (store) => store.ingredients.constructorIngredients
  );

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredientDetails }) {
      const updatedIngredient = {
        ...ingredientDetails,
        _key: nanoid(),
      };

      dispatch(addIngredient(updatedIngredient));
    },
  });

  const [ingredients, setIngredients] = useState(constructorIngredients);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setIngredients((prevIngredients) =>
      update(prevIngredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevIngredients[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((ingredient, index) => {
    const { name, price, image, _key } = ingredient;

    return (
      <li
        className={style.item}
        key={_key}
        draggable={true}
        index={index}
        moveCard={moveCard}
      >
        <img className={style.img} src={listStyleImage} alt="Иконка" />
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => dispatch(deleteIngredient(_key))}
        />
      </li>
    );
  }, []);

  return (
    <div ref={dropTarget}>
      <Bun type={"top"} />
      <ul
        style={{ maxHeight: 300 }}
        className={`${style.scroll} custom-scroll `}
      >
        {ingredients.length !== 0 ? (
          ingredients.map((card, i) => renderCard(card, i))
        ) : (
          <TemplateIngredient />
        )}
      </ul>
      <Bun type={"bottom"} />
    </div>
  );
};

export default IngredientsList;
