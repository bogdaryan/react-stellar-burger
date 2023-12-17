import styles from "./order-status-section.module.css";

import NumberOrderStatus from "./number-order-status/number-order-status";

const OrderStatusSection = () => {
  const tempArr = [
    "111111",
    "222222",
    "333333",
    "444444",
    "555555",
    "666666",
    "777777",
    "888888",
    "999999",
    "000000",
    "000000",
    "000000",
  ];

  const ReadyOrders = ({ arr }) => (
    <NumberOrderStatus
      orderNumbers={arr}
      title={"Готовы:"}
      classNameSuccess={styles.success}
    />
  );
  const PreparingOrders = ({ arr }) => (
    <NumberOrderStatus orderNumbers={arr} title={"В работе:"} />
  );

  return (
    <section className={styles.container}>
      <ReadyOrders arr={tempArr} />
      <PreparingOrders arr={tempArr} />
    </section>
  );
};

export default OrderStatusSection;
