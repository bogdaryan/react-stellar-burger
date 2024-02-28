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

import { setOrderStatus } from "../../services/order/ordersStatusSlice";
import { getValidPublicFeed } from "../../services/websoket/selectors";

function OrderStatusSection() {
  const dispatch = useDispatch();
  const validOrders = useSelector(getValidPublicFeed);

  const ordersDone = useSelector(getOrdersDone);
  const ordersPending = useSelector(getOrdersPending);

  useEffect(() => {
    dispatch(setOrderStatus(validOrders));
  }, [validOrders, dispatch]);

  return (
    <section className={styles.container}>
      <OrdersDone orderNumbers={ordersDone} />
      <OrdersPending orderNumbers={ordersPending} />
    </section>
  );
}

export default OrderStatusSection;
