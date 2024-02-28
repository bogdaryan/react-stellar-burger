import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import { addIngredient } from "../../../services/ingredients/ingredientsConstructorSlice";

import Ingredient from "../ingredient/ingredient";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import TemplateIngredient from "../template-ingredient/template-ingredient";
import TemplateBun from "../template-bun/template-bun";

import styles from "./ingredients-list.module.css";
import { useEffect, useRef, useState } from "react";

import { getConstructorItems } from "../../../services/ingredients/selectors";
import useViewportHeight from "../../../hooks/useViewportHeight";
import { TIngredient } from "../../../types/types";

function IngredientsList() {
  const [bunClassName, setBunClassName] = useState<string | null>(null);
  const [ingredientClassName, setIngredientClassName] = useState<string | null>(
    null
  );
  const listRef = useRef<HTMLUListElement>(null);
  const height = useViewportHeight(listRef, 80, true);

  const dispatch = useDispatch();
  const {
    bun,
    ingredients,
  }: {
    bun: TIngredient | null;
    ingredients: TIngredient[] | null;
  } = useSelector(getConstructorItems);

  const [{ canDrop, draggableItem }, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredientDetails }: { ingredientDetails: TIngredient }) {
      dispatch(addIngredient(ingredientDetails));
    },
    collect: (monitor) => ({
      draggableItem: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
  });

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
          extraClass={`${styles.top} ml-8`}
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
          ingredients.map(({ name, price, image, _key }, i: number) => {
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
}

export default IngredientsList;
