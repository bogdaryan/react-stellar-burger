import styles from "./order-status-section.module.css";

import {
  OrdersDone,
  OrdersPending,
} from "./number-order-status/number-order-status";

import { useDispatch, useSelector } from "../../hooks/hooks";

import { useEffect } from "react";

import {
  getOrdersDone,
  getOrdersPending,
} from "../../services/order/selectors";

import { setOrderStatus } from "../../services/order/ordersStatusSlice";
import { getValidPublicFeed } from "../../services/websoket/selectors";
import { TOrderDetails } from "../../types/types";

function OrderStatusSection() {
  const dispatch = useDispatch();
  const validOrders = useSelector(getValidPublicFeed);

  const ordersDone = useSelector(getOrdersDone);
  const ordersPending = useSelector(getOrdersPending);

  useEffect(() => {
    if (validOrders) {
      dispatch(setOrderStatus(validOrders as TOrderDetails[]));
    }
  }, [validOrders, dispatch]);

  return (
    <section className={styles.container}>
      <OrdersDone orderNumbers={ordersDone} />
      <OrdersPending orderNumbers={ordersPending} />
    </section>
  );
}

export default OrderStatusSection;
