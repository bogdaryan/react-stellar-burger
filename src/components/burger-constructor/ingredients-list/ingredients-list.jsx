import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

import { addIngredient } from "../../../services/ingredients/ingredientsConstructor";

import Ingredient from "../ingredient/ingredient";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import TemplateIngredient from "../template-ingredient/template-ingredient";
import TemplateBun from "../template-bun/template-bun";

import styles from "./ingredients-list.module.css";
import { useEffect, useRef, useState } from "react";

import { getConstructorItems } from "../../../services/ingredients/selectors";

const IngredientsList = ({ scrollHeight }) => {
  const [height, setHeight] = useState(null);
  const [bunClassName, setBunClassName] = useState();
  const [ingredientClassName, setIngredientClassName] = useState();
  const listRef = useRef();

  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(getConstructorItems);

  const [{ canDrop, draggableItem }, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredientDetails }) {
      dispatch(addIngredient(ingredientDetails));
    },
    collect: (monitor) => ({
      draggableItem: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    const itemListHeight = listRef.current.firstChild.clientHeight;
    const gap = 40;

    setHeight(scrollHeight - itemListHeight * 2 - gap);
  }, [scrollHeight]);

  useEffect(() => {
    if (!canDrop) {
      setBunClassName(null);
      setIngredientClassName(null);
      return;
    }

    const targetDragItem = draggableItem.ingredientDetails;
    const isBun = targetDragItem.type === "bun";
    const bunClassName = isBun ? styles.isDrag : null;
    const ingredientClassName = !isBun ? styles.isDrag : null;

    setBunClassName(bunClassName);
    setIngredientClassName(ingredientClassName);
  }, [canDrop, draggableItem]);

  return (
    <div ref={dropTarget}>
      {bun ? (
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.top}  ml-8`}
        />
      ) : (
        <TemplateBun type={"top"} bunClassName={bunClassName} />
      )}
      <ul
        style={{ maxHeight: height }}
        className={`${styles.scroll} scrollbarTrackBorder custom-scroll `}
        ref={listRef}
      >
        {ingredients.length !== 0 ? (
          ingredients.map(({ name, price, image, _key }, i) => {
            return (
              <Ingredient
                name={name}
                price={price}
                image={image}
                index={i}
                key={_key}
                id={_key}
              />
            );
          })
        ) : (
          <TemplateIngredient ingredientClassName={ingredientClassName} />
        )}
      </ul>
      {bun ? (
        <ConstructorElement
          type={"bottom"}
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.bottom} ml-8`}
        />
      ) : (
        <TemplateBun type={"bottom"} bunClassName={bunClassName} />
      )}
    </div>
  );
};

TemplateIngredient.propTypes = {
  scrollHeight: PropTypes.number,
};

export default IngredientsList;
