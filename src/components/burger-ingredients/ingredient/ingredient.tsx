import { useDrag } from "react-dnd";
import { useDispatch } from "../../../hooks/hooks";

import styles from "./ingredient.module.css";

import { setIngredientDetails } from "../../../services/ingredients/ingredientDetailsSlice";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { TCounter, TIngredient } from "../../../types/types";

type Props = {
  ingredientDetails: TIngredient;
  counter: TCounter;
};

function Ingredient({ ingredientDetails, counter }: Props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { name, price, image, _id } = ingredientDetails;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredientDetails },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const onClick = () => {
    dispatch(setIngredientDetails(ingredientDetails));
  };

  return (
    <Link
      className={`${styles.card} noselect mb-8`}
      onClick={onClick}
      draggable={true}
      ref={dragRef}
      to={`/ingredients/${_id}`}
      state={{ background: location }}
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
    </Link>
  );
}

export default Ingredient;
