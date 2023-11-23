import React from "react";
import style from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";

function IngredientDetails({ ingredient }) {
  const { name, image_large, calories, proteins, fat, carbohydrates } =
    ingredient;

  return (
    <div className={`${style.ingredient} pt-10 pb-15 pl-10 pr-10`}>
      <h2 className={`${style.text} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img src={image_large} alt="Фото ингредиента" />

      <p className={`${style.name} text text_type_main-medium mt-4 mb-8`}>
        {name}
      </p>
      <ul className={style.list}>
        <li className={style.item}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_main-medium">{calories}</p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_main-medium">{proteins}</p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_main-medium">{fat}</p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_main-medium">{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default IngredientDetails;
