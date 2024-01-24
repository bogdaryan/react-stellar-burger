import styles from "./order-status-section.module.css";

import {
  OrdersDone,
  OrdersPending,
} from "./number-order-status/number-order-status";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  getOrdersDone,
  getOrdersPending,
} from "../../services/order/selectors";

import { setOrderStatus } from "../../services/order/ordersNumberStatus";
import { getOnlyValidFeed } from "../../services/websoket/selectors";

const OrderStatusSection = () => {
  const dispatch = useDispatch();
  const validOrders = useSelector(getOnlyValidFeed);

  const ordersDone = useSelector(getOrdersDone);
  const ordersPending = useSelector(getOrdersPending);

  useEffect(() => {
    dispatch(setOrderStatus(validOrders));
  }, [validOrders, dispatch]);

  return (
    <section className={styles.container}>
      <OrdersDone arr={ordersDone} />
      <OrdersPending arr={ordersPending} />
    </section>
  );
};

export default OrderStatusSection;
