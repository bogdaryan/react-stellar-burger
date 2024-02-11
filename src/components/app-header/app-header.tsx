import styles from "./app-header.module.css";
import { FC } from "react";

import { Link, NavLink } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

type TisActive = {
  isActive: boolean;
};

const setActive = (isActive: boolean, defaultClass: string) => {
  return [defaultClass, isActive && styles.active].filter(Boolean).join(" ");
};

const AppHeader: FC = () => {
  return (
    <header className={`${styles.header} mt-10 pt-4 pb-3`}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }: TisActive) =>
            setActive(isActive, `${styles.link} pt-5 pb-5 pl-5 pr-5`)
          }
        >
          {({ isActive }: TisActive) => (
            <>
              <BurgerIcon type={isActive ? "primary" : "secondary"} />
              <p className={`text text_type_main-default ml-2`}>Конструктор</p>
            </>
          )}
        </NavLink>

        <NavLink
          to="/feed"
          className={({ isActive }: TisActive) =>
            setActive(isActive, `${styles.link} pt-5 pb-5 pl-5 pr-5 ml-3 `)
          }
        >
          {({ isActive }: TisActive) => (
            <>
              <ListIcon type={isActive ? "primary" : "secondary"} />
              <p className={`text text_type_main-default ml-2`}>
                Лента заказов
              </p>
            </>
          )}
        </NavLink>

        <Link to="/" className={`${(styles.link, styles.logo)}`}>
          <Logo />
        </Link>

        <NavLink
          to="/profile"
          className={({ isActive }: TisActive) =>
            setActive(isActive, `${styles.link} p-5`)
          }
        >
          {({ isActive }: TisActive) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <p className={`text text_type_main-default ml-2`}>
                Личный кабинет
              </p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
