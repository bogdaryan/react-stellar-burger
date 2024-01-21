import styles from "./order-status-section.module.css";
import NumberOrderStatus from "./number-order-status/number-order-status";

const ReadyOrders = ({ arr }) => (
  <NumberOrderStatus
    orderNumbers={arr}
    title={"Готовы:"}
    classNameSuccess={styles.success}
  />
);

const PendingOrders = ({ arr }) => (
  <NumberOrderStatus orderNumbers={arr} title={"В работе:"} />
);

const OrderStatusSection = () => {
  return (
    <section className={styles.container}>
      <ReadyOrders arr={[]} />
      <PendingOrders arr={[[]]} />
    </section>
  );
};

export default OrderStatusSection;

/*
  создать заказ
  добавить в масив заказов 
*/
