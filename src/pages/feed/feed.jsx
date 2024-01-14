import styles from "./feed.module.css";

import OrderCounter from "../../components/order-counter/order-counter";
import ListOrdersSection from "../../components/list-feed-orders-section/list-feed-orders-section";
import OrderStatusSection from "../../components/order-status-section/order-status-section";

const NumberOrdersForAllTime = ({ count }) => (
  <OrderCounter count={count} title={"Выполнено за все время:"} />
);
const NumberOrdersToday = ({ count }) => (
  <OrderCounter count={count} title={"Выполнено за сегодня:"} />
);

const Feed = () => {
  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large mt-10">Лента заказов</h1>
      <div className={styles.inner}>
        <ListOrdersSection />

        <section className={styles.wrapper}>
          <OrderStatusSection />
          <NumberOrdersForAllTime count={"28 752"} />
          <NumberOrdersToday count={"128"} />
        </section>
      </div>
    </section>
  );
};

export default Feed;
