import styles from "./profile.module.css";

import { Link, Outlet, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userLogoutRequest } from "../../services/auth/logoutApi";

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const refreshToken = localStorage.getItem("refreshToken");

  const logout = () => {
    dispatch(userLogoutRequest(refreshToken));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <section className={styles.container}>
      <nav className={`${styles.containerLinks} mr-15`}>
        <Link
          className={`
          ${styles.link} text text_type_main-medium 
          ${isActive("/profile") ? styles.active : ""}`}
          to="/profile"
        >
          Профиль
        </Link>
        <Link
          className={`
          ${styles.link} text text_type_main-medium 
          ${isActive("/profile/orders") ? styles.active : ""}`}
          to="/profile/orders"
        >
          История заказов
        </Link>

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
