import styles from "./profile.module.css";

import { Outlet } from "react-router-dom";

import CustomLink from "./custom-link/custom-link";
import MotionElement from "../../components/motion-element/motion-element";

const Profile = () => {
  return (
    <section className={styles.container}>
      <MotionElement className={styles.containerMotion}>
        <nav className={`${styles.containerLinks} mr-15`}>
          <CustomLink
            classNameActive={styles.linkActive}
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile"}
          >
            Профиль
          </CustomLink>
          <CustomLink
            classNameActive={styles.linkActive}
            className={`${styles.link} text text_type_main-medium`}
            to={"/profile/orders"}
          >
            История заказов
          </CustomLink>
          <CustomLink
            classNameActive={styles.linkActive}
            className={`${styles.link} text text_type_main-medium`}
            to={""}
          >
            Выход
          </CustomLink>

          <p className={`${styles.subtitle} text text_type_main-default mt-20`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>
        <Outlet />
      </MotionElement>
    </section>
  );
};

export default Profile;
