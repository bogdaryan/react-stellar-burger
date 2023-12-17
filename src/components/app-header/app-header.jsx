import styles from "./app-header.module.css";
import React from "react";

import CustomLink from "./custom-link/custom-link";
import { Link } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={`${styles.header} mt-10 pt-4 pb-3`}>
      <nav className={styles.nav}>
        <CustomLink
          to="/"
          className={`${styles.link} pt-5 pb-5 pl-5 pr-5`}
          classNameActive={styles.active}
          Icon={BurgerIcon}
        >
          <p className={`text text_type_main-default ml-2`}>Конструктор</p>
        </CustomLink>

        <CustomLink
          to="/feed"
          className={` ${styles.link} pt-5 pb-5 pl-5 pr-5 ml-3`}
          classNameActive={styles.active}
          Icon={ListIcon}
        >
          <p className={`text text_type_main-default ml-2`}>Лента заказов</p>
        </CustomLink>

        <Link to="/" className={`${(styles.link, styles.logo)}`}>
          <Logo />
        </Link>

        <CustomLink
          to="/profile"
          className={`${styles.link} p-5`}
          classNameActive={styles.active}
          Icon={ProfileIcon}
        >
          <p className={`text text_type_main-default ml-2`}>Личный кабинет</p>
        </CustomLink>
      </nav>
    </header>
  );
};

export default AppHeader;
