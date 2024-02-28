import styles from "./feed.module.css";

import { useSelector } from "../../hooks/hooks";
import {
  NumberOrdersForAllTime,
  NumberOrdersToday,
} from "../../components/order-counter/order-counter";
import ListOrdersSection from "../../components/list-feed-orders-section/list-feed-orders-section";
import OrderStatusSection from "../../components/order-status-section/order-status-section";
import { getTotal, getTotalToday } from "../../services/websoket/selectors";
import { Outlet } from "react-router-dom";

function Feed() {
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

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
}

export default Feed;
