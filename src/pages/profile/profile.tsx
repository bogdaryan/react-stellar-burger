import styles from "./profile.module.css";

import { Link, Outlet, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../../services/api/user.api";

function Profile() {
  const [logout] = useLogoutMutation();
  const location = useLocation();

  const isActive = (path: string) => {
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
          className={`${styles.link} ${styles.logoutBtn} text text_type_main-medium`}
          onClick={() => logout(null)}
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
}

export default Profile;
