import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TemplateBun from "../burger-ingredients/template-bun/template-bun";
import TemplateIngredient from "../burger-ingredients/template-ingredient/template-ingredient";

import { deleteIngredient } from "../../services/ingredientsSlice";
import { postOrder } from "../../asyncActions/postOrder";

import style from "./burger-constructor.module.css";

import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import listStyleImage from "../../images/burger-constructor-list-marker.svg";
import currencyIcon from "../../images/currency_icon.svg";

function BurgerConstructor({ scrollHeight }) {
  const dispatch = useDispatch();
  const bun = useSelector((store) => store.ingredients.bun);
  const ingredients = useSelector(
    (store) => store.ingredients.constructorIngredients
  );

  const totalPrice = useMemo(() => {
    const ingredientsPrice = ingredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );
    const bunPrice = bun ? bun.price * 2 : 0;

    return ingredientsPrice + bunPrice;
  }, [ingredients, bun]);

  const [listHeight, setListHeight] = useState();
  const constructorRef = useRef();
  const priceContainerRef = useRef();

  useEffect(() => {
    const constructorElement = constructorRef.current.firstChild;
    const priceWrapperHeight = constructorRef.current.nextSibling.clientHeight;

    const height =
      scrollHeight - priceWrapperHeight - constructorElement.clientHeight * 2;

    setListHeight(height);
  }, [scrollHeight]);

  const ids = useMemo(() => {
    if (!ingredients || !bun) return;

    const ingredientIds = [bun._id];

    for (let item of ingredients) {
      ingredientIds.push(item._id);
    }

    ingredientIds.push(bun._id);

    return ingredientIds;
  }, [ingredients, bun]);

  const handlePostOrder = () => {
    if (!ids) return;

    dispatch(postOrder(ids));
  };

  return (
    <section className={`${style.constructor} mt-25 pr-4 pl-4`}>
      <div ref={constructorRef}>
        {bun ? (
          <ConstructorElement
            type="top"
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
          style={{ maxHeight: listHeight }}
          className={`${style.scroll} custom-scroll `}
        >
          {ingredients.length !== 0 ? (
            ingredients.map(({ name, price, image, _key }) => {
              return (
                <li className={style.item} key={_key} draggable={true}>
                  <img
                    className={style.img}
                    src={listStyleImage}
                    alt="Иконка"
                  />
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
            type="bottom"
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
      <div className={`${style.wrapper} pt-10`} ref={priceContainerRef}>
        <div className={`${style.price} mr-10`}>
          <p className="text text_type_digits-medium">{totalPrice || 0}</p>
          <img src={currencyIcon} alt="Иконка валюты" />
        </div>
        <Button
          onClick={handlePostOrder}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
export default BurgerConstructor;
