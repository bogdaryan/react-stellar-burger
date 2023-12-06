// import update from "immutability-helper";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import {
  deleteIngredient,
  addIngredient,
} from "../../../services/ingredientsSlice";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import TemplateIngredient from "../template-ingredient/template-ingredient";
import TemplateBun from "../template-bun/template-bun";

import style from "./ingredients-list.module.css";
import listStyleImage from "../../../images/burger-constructor-list-marker.svg";
import { useEffect, useRef, useState } from "react";

const IngredientsList = ({ scrollHeight }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (store) => store.ingredients.constructorIngredients
  );
  const bun = useSelector((store) => store.ingredients.bun);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredientDetails }) {
      dispatch(addIngredient(ingredientDetails));
    },
  });

  const [height, setHeight] = useState(null);
  const listRef = useRef();

  useEffect(() => {
    const itemListHeight = listRef.current.firstChild.clientHeight;
    const gap = 40;

    setHeight(scrollHeight - itemListHeight * 2 - gap);
  }, [scrollHeight]);

  // const moveIngredient = useCallback((dragIndex, hoverIndex) => {
  //   setIngredients((prevIngredients) =>
  //     update(prevIngredients, {
  //       $splice: [
  //         [dragIndex, 1],
  //         [hoverIndex, 0, prevIngredients[dragIndex]],
  //       ],
  //     })
  //   );
  // }, []);

  return (
    <div ref={dropTarget}>
      {bun ? (
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${style.top} ml-8`}
        />
      ) : (
        <TemplateBun type={"top"} />
      )}
      <ul
        style={{ maxHeight: height }}
        className={`${style.scroll} custom-scroll `}
        ref={listRef}
      >
        {ingredients.length !== 0 ? (
          ingredients.map(({ name, price, image, _key }, i) => {
            return (
              <li
                className={style.item}
                key={_key}
                draggable={true}
                index={i}
                // moveIngredient={moveIngredient}
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
          })
        ) : (
          <TemplateIngredient />
        )}
      </ul>
      {bun ? (
        <ConstructorElement
          type={"bottom"}
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${style.bottom} ml-8`}
        />
      ) : (
        <TemplateBun type={"bottom"} />
      )}
    </div>
  );
};

export default IngredientsList;
