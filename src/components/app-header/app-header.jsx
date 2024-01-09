import styles from "./app-header.module.css";

import { Link, NavLink } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const setActive = (isActive, defaultClass) => {
  return [defaultClass, isActive && styles.active].filter(Boolean).join(" ");
};

const AppHeader = () => {
  return (
    <header className={`${styles.header} mt-10 pt-4 pb-3`}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            setActive(isActive, `${styles.link} pt-5 pb-5 pl-5 pr-5`)
          }
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? "primary" : "secondary"} />
              <p className={`text text_type_main-default ml-2`}>Конструктор</p>
            </>
          )}
        </NavLink>

        <NavLink
          to="/feed"
          className={({ isActive }) =>
            setActive(isActive, `${styles.link} pt-5 pb-5 pl-5 pr-5 ml-3 `)
          }
        >
          {({ isActive }) => (
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
          className={({ isActive }) =>
            setActive(isActive, `${styles.link} p-5`)
          }
        >
          {({ isActive }) => (
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
