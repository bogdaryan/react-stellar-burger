import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import styles from "./ingredient.module.css";

import { showIngredientDetails } from "../../../services/ingredients/ingredientDetails";

import { ingredientPropType } from "../../../utils/prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Ingredient({ ingredientDetails, counter }) {
  const dispatch = useDispatch();

  const { name, price, image } = ingredientDetails;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredientDetails },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <li
      className={`${styles.card} noselect mb-8`}
      onClick={() => dispatch(showIngredientDetails(ingredientDetails))}
      draggable={true}
      ref={dragRef}
    >
      {counter[name] && (
        <Counter count={counter[name]} size="default" extraClass="m-1" />
      )}
      <img className={`${styles.img} ml-1 mt-1`} src={image} alt={name} />
      <div className={`${styles.wrapper} mt-1 mb-1`}>
        <p className={`${styles.price} text text_type_digits-default mr-2`}>
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
  counters: PropTypes.object,
};

export default Ingredient;
