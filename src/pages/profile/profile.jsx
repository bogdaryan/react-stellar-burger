import styles from "./profile.module.css";

import { NavLink, Outlet, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userLogoutRequest } from "../../services/auth/logoutApi";

const Profile = () => {
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem("refreshToken");

  const logout = () => {
    dispatch(userLogoutRequest(refreshToken));
  };

  const setActive = (isActive, defaultClass) => {
    return [defaultClass, isActive && styles.active].filter(Boolean).join(" ");
  };

  return (
    <section className={styles.container}>
      <nav className={`${styles.containerLinks} mr-15`}>
        <NavLink
          className={({ isActive }) =>
            setActive(isActive, `${styles.link} text text_type_main-medium`)
          }
          to={"/profile"}
        >
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            setActive(isActive, `${styles.link} text text_type_main-medium`)
          }
          to={"/profile/orders"}
        >
          История заказов
        </NavLink>

        <button
          active={styles.linkActive}
          className={`${styles.link} ${styles.logoutBtn} text text_type_main-medium`}
          onClick={logout}
        >
          Выход
        </button>

        <p className={`${styles.subtitle} text text_type_main-default mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </section>
  );
};

export default Profile;
