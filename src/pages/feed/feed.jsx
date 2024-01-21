import styles from "./feed.module.css";
import OrderCounter from "../../components/order-counter/order-counter";
import ListOrdersSection from "../../components/list-feed-orders-section/list-feed-orders-section";
import OrderStatusSection from "../../components/order-status-section/order-status-section";
import { useSelector } from "react-redux";
import {
  // getStatusWsFeed,
  getTotal,
  getTotalToday,
} from "../../services/websoket/selectors";
import { Outlet } from "react-router-dom";

const NumberOrdersForAllTime = ({ count }) => (
  <OrderCounter count={count} title={"Выполнено за все время:"} />
);
const NumberOrdersToday = ({ count }) => (
  <OrderCounter count={count} title={"Выполнено за сегодня:"} />
);

const Feed = () => {
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

  // const wsConnected = useSelector(getStatusWsFeed);

  return (
    <>
      <section className={styles.container}>
        <h1 className="text text_type_main-large mt-10">Лента заказов</h1>
        <div className={styles.inner}>
          <ListOrdersSection />

          <section className={styles.wrapper}>
            <OrderStatusSection />
            <NumberOrdersForAllTime count={total} />
            <NumberOrdersToday count={totalToday} />
          </section>
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default Feed;
