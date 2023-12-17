import { nanoid } from "@reduxjs/toolkit";

import styles from "./number-order-status.module.css";

const NumberOrderStatus = ({
  title,
  orderNumbers = [],
  classNameSuccess = null,
}) => {
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <ul className={styles.list}>
        {orderNumbers.map((number) => {
          return (
            <li
              className={`${styles.number} ${classNameSuccess} text text_type_digits-default`}
              key={nanoid()}
            >
              {number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NumberOrderStatus;
