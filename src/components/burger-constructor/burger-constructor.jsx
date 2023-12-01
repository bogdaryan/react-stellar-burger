import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteIngredient } from "../../services/ingredientsSlice";
import { postOrder } from "../../asyncActions/postOrder";

import style from "./burger-constructor.module.css";
import PropTypes from "prop-types";

import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import listStyleImage from "../../images/burger-constructor-list-marker.svg";
import currencyIcon from "../../images/currency_icon.svg";

function BurgerConstructor({ openOrderDetails }) {
  const [totalPrice, setTotalPrice] = useState(null);

  const dispatch = useDispatch();
  const ingredients = useSelector(
    (store) => store.ingredients.constructorIngredients
  );
  const bun = useSelector((store) => store.ingredients.bun);

  const orderDetails = useSelector((store) => store.modal.orderDetails);

  useEffect(() => {
    if (orderDetails) {
      console.log(orderDetails);
    }
  }, [orderDetails]);

  const [height, setHeight] = useState(0);

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
    const totalPrice = [...ingredients, bun, bun].reduce(
      (acc, ingredient) => acc + ingredient.price,
      null
    );
    setTotalPrice(totalPrice);
  }, [bun, ingredients]);

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
          {ingredients.map(({ name, price, image, _idConstructor }) => {
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
          onClick={() => dispatch(postOrder([...ingredients, bun, bun]))}
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
};

export default BurgerConstructor;
