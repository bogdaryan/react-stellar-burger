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
        {Array.from(orderNumbers)
          .sort((a, b) => b - a)
          .slice(0, 10)
          .map((number, idx) => {
            return (
              <li
                className={`${styles.number} ${classNameSuccess} text text_type_digits-default`}
                key={idx}
              >
                {number}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export const OrdersDone = ({ arr }) => (
  <NumberOrderStatus
    orderNumbers={arr}
    title={"Готовы:"}
    classNameSuccess={styles.success}
  />
);

export const OrdersPending = ({ arr }) => (
  <NumberOrderStatus orderNumbers={arr} title={"В работе:"} />
);
