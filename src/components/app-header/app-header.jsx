import React from "react";
import style from "./app-header.module.css";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={`${style.header} mt-10 pt-4 pb-3`}>
      <nav className={style.nav}>
        <a className={`${style.link} pt-5 pb-5 pl-5 pr-5`} href="#">
          <BurgerIcon type="secondary" />
          <p className={`text text_type_main-default ml-2`}>Конструктор</p>
        </a>
        <a className={` ${style.link} pt-5 pb-5 pl-5 pr-5 ml-3`} href="#">
          <ListIcon type="secondary" />
          <p className={`text text_type_main-default ml-2`}>Лента заказов</p>
        </a>
        <a className={`${(style.link, style.logo)}`} href="#">
          <Logo />
        </a>
        <a className={`${style.link} p-5`} href="#">
          <ProfileIcon type="secondary" />
          <p className={`text text_type_main-default ml-2`}>Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;
