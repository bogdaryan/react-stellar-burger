import styles from "./list-feed-orders-section.module.css";
import { wsURL } from "../../utils/constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHeight from "../../hooks/useHeight";
import { Order } from "../order/order";
import { Link } from "react-router-dom";

import { wsConnect, wsDisconnect } from "../../services/websoket/actions";
import { getOnlyValidFeed } from "../../services/websoket/selectors";

const ListFeedOrdersSection = () => {
  const dispatch = useDispatch();
  const validOrders = useSelector(getOnlyValidFeed);

  const [scrollHeight, setScrollHeight] = useState(null);
  const scrollTrackRef = useRef();
  const height = useHeight(scrollTrackRef);

  useEffect(() => {
    setScrollHeight(height);
  }, [height, setScrollHeight]);

  useEffect(() => {
    dispatch(wsConnect(`${wsURL}/orders/all`));

    return () => dispatch(wsDisconnect());
  }, [dispatch]);

  function onClick(order) {
    localStorage.setItem("order", JSON.stringify(order));
  }

  return (
    <section className={styles.container}>
      <div
        style={{ maxHeight: scrollHeight }}
        className={`${styles.orderList} scrollbarTrackBorder custom-scroll`}
        ref={scrollTrackRef}
      >
        {validOrders.map((order) => {
          const { number, _id } = order;

          return (
            <Link
              to={`${number}`}
              className={styles.link}
              key={_id}
              onClick={() => onClick(order)}
            >
              <Order orderDetails={order} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ListFeedOrdersSection;
