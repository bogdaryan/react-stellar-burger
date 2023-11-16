import React, { useRef, useEffect, useState } from "react";
import style from "./burger-constructor.module.css";
import PropTypes from "prop-types";

import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import listStyleImage from "../../images/burger-constructor-list-marker.svg";
import currencyIcon from "../../images/currency_icon.svg";

function BurgerConstructor({ openOrderDetails }) {
  const [height, setHeight] = useState(0);

  const sectionConstructorRef = useRef();
  const priceWrapperRef = useRef();
  const innerRef = useRef();

  const BurgerIngredientsHeight = +localStorage.height;

  function calcListHeight() {
    const constructorElement = innerRef.current.children[0].clientHeight;
    const priceWrapperHeight = priceWrapperRef.current.clientHeight;
    const gap = 16;

    const listHeight =
      BurgerIngredientsHeight -
      priceWrapperHeight -
      constructorElement * 2 +
      gap;

    setHeight(listHeight);
  }

  useEffect(() => {
    calcListHeight();
  }, [BurgerIngredientsHeight]);

  return (
    <section
      ref={sectionConstructorRef}
      className={`${style.constructor} mt-25 pr-4 pl-4`}
    >
      <div ref={innerRef}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          extraClass={`${style.top} ml-8`}
        />
        <ul
          style={{ maxHeight: height }}
          className={`${style.scroll} custom-scroll `}
        >
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text={"Плоды Фалленианского дерева"}
              price={874}
              thumbnail={"https://code.s3.yandex.net/react/code/sp_1.png"}
            />
          </li>
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text={"Плоды Фалленианского дерева"}
              price={874}
              thumbnail={"https://code.s3.yandex.net/react/code/sp_1.png"}
            />
          </li>
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text={"Плоды Фалленианского дерева"}
              price={874}
              thumbnail={"https://code.s3.yandex.net/react/code/sp_1.png"}
            />
          </li>
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text={"Плоды Фалленианского дерева"}
              price={874}
              thumbnail={"https://code.s3.yandex.net/react/code/sp_1.png"}
            />
          </li>
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text={"Плоды Фалленианского дерева"}
              price={874}
              thumbnail={"https://code.s3.yandex.net/react/code/sp_1.png"}
            />
          </li>
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text={"Плоды Фалленианского дерева"}
              price={874}
              thumbnail={"https://code.s3.yandex.net/react/code/sp_1.png"}
            />
          </li>
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          extraClass={`${style.bottom} ml-8`}
        />
      </div>
      <div ref={priceWrapperRef} className={`${style.wrapper} pt-10`}>
        <div className={`${style.price} mr-10`}>
          <p className="text text_type_digits-medium">610</p>
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
  BurgerConstructor: PropTypes.func.isRequired,
};

export default BurgerConstructor;
