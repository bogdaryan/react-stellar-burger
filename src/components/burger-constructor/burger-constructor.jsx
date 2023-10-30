import React, { useRef, useEffect, useState } from "react";
import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import listStyleImage from "../../images/burger-constructor-list-marker.svg";
import currencyIcon from "../../images/currency_icon.svg";

function BurgerConstructor() {
  const [height, setHeight] = useState(0);
  const section = useRef();
  const priceWrapper = useRef();
  const inner = useRef();

  const sectionHeight = +localStorage.height;

  function calcListHeight() {
    const innerChildHeight = inner.current.children[0].clientHeight;
    const priceWrapperHeight = priceWrapper.current.clientHeight;
    const gap = 16;

    const listHeight =
      sectionHeight - priceWrapperHeight - innerChildHeight * 2 + gap;

    setHeight(listHeight);
  }

  useEffect(() => {
    calcListHeight();
  }, [sectionHeight]);

  return (
    <section ref={section} className={`${style.constructor} mt-25 pr-4 pl-4`}>
      <div ref={inner} className="">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          extraClass={`${style.top} ml-8`}
        />
        <ul
          style={{
            maxHeight: height,
          }}
          className={`${style.scroll} custom-scroll `}
        >
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={3000}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
            />
          </li>
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={3000}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
            />
          </li>
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={3000}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
            />
          </li>
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={3000}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
            />
          </li>
          <li className={style.item}>
            <img className={style.img} src={listStyleImage} alt="Иконка" />
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={3000}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
            />
          </li>
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          extraClass={`${style.bottom} ml-8`}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
      </div>
      <div ref={priceWrapper} className={`${style.wrapper} pt-10`}>
        <div className={`${style.price} mr-10`}>
          <p className="text text_type_digits-medium">610</p>
          <img src={currencyIcon} alt="Иконка валюты" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
