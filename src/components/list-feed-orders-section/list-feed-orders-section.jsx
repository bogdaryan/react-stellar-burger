import styles from "./list-feed-orders-section.module.css";
import { wsURL } from "../../utils/constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHeight from "../../hooks/useHeight";
import { Order } from "../order/order";
import { Link } from "react-router-dom";

import { wsConectionStart } from "../../services/websoket/actions";

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
    dispatch(wsConectionStart(`${wsURL}/orders/all`));

    return () => {};
  }, [dispatch]);

  const renderOrders = () => {
    if (!validOrders) return;

    return validOrders.map((order) => {
      const { number, _id } = order;

      return (
        <Link className={styles.link} to={number} key={_id}>
          <Order orderDetails={order} />
        </Link>
      );
    });
  };

  return (
    <section className={styles.container}>
      <div
        style={{ maxHeight: scrollHeight }}
        className={`${styles.orderList} scrollbarTrackBorder custom-scroll`}
        ref={scrollTrackRef}
      >
        {renderOrders()}
      </div>
    </section>
  );
};

export default ListFeedOrdersSection;
