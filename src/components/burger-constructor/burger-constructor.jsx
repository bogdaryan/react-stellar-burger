import React, { useRef, useEffect, useState, useContext } from "react";
import style from "./burger-constructor.module.css";
import PropTypes from "prop-types";

import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import listStyleImage from "../../images/burger-constructor-list-marker.svg";
import currencyIcon from "../../images/currency_icon.svg";

import { BurgerIngredientContext } from "../../utils/appContext";

import { calcTotalPrice, deleteIngredient } from "../../services/actions";

function BurgerConstructor({ openOrderDetails, setTotalPrice, totalPrice }) {
  const [height, setHeight] = useState(0);
  const { store, dispatch } = useContext(BurgerIngredientContext);

  const { bun } = store;

  const sectionConstructorRef = useRef();
  const priceWrapperRef = useRef();
  const innerRef = useRef();

  const burgerIngredientsHeight = +localStorage.height;

  function calcListHeight() {
    const constructorElement = innerRef.current.children[0].clientHeight;
    const priceWrapperHeight = priceWrapperRef.current.clientHeight;
    const gap = 16;

    const listHeight =
      burgerIngredientsHeight -
      priceWrapperHeight -
      constructorElement * 2 +
      gap;

    setHeight(listHeight);
  }

  useEffect(() => {
    calcListHeight();
  }, [burgerIngredientsHeight]);

  useEffect(() => {
    const totalPrice = [...store.ingredients, bun, bun].reduce(
      (acc, ingredient) => acc + ingredient.price,
      null
    );

    setTotalPrice(totalPrice);
  }, [store]);

  return (
    <section
      ref={sectionConstructorRef}
      className={`${style.constructor} mt-25 pr-4 pl-4`}
    >
      <div ref={innerRef}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`${style.top} ml-8`}
          />
        )}

        <ul
          style={{ maxHeight: height }}
          className={`${style.scroll} custom-scroll `}
        >
          {store.ingredients.map(({ name, price, image, _idConstructor }) => {
            return (
              <li className={style.item} key={_idConstructor}>
                <img className={style.img} src={listStyleImage} alt="Иконка" />
                <ConstructorElement
                  text={name}
                  price={price}
                  thumbnail={image}
                  handleClose={() => dispatch(deleteIngredient(_idConstructor))}
                />
              </li>
            );
          })}
        </ul>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`${style.bottom} ml-8`}
          />
        )}
      </div>
      <div ref={priceWrapperRef} className={`${style.wrapper} pt-10`}>
        <div className={`${style.price} mr-10`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <img src={currencyIcon} alt="Иконка валюты" />
        </div>
        <Button
          onClick={openOrderDetails}
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

BurgerConstructor.propsType = {
  openOrderDetails: PropTypes.func.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default BurgerConstructor;
