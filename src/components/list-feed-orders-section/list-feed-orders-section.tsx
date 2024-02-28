import styles from "./list-feed-orders-section.module.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "../../hooks/hooks";

import { PublicOrder } from "../order/order";

import { getValidPublicFeed } from "../../services/websoket/selectors";
import useViewportHeight from "../../hooks/useViewportHeight";
import { wsURL } from "../../utils/constants";
import { wsConnect, wsDisconnect } from "../../services/websoket/actions";
import { TOrderDetails } from "../../types/types";

function ListFeedOrdersSection() {
  const dispatch = useDispatch();
  const validOrders: ReadonlyArray<TOrderDetails> =
    useSelector(getValidPublicFeed);
  const scrollTrackRef = useRef(null);
  const height = useViewportHeight(scrollTrackRef, 0);

  useEffect(() => {
    const wsPayload = `${wsURL}/orders/all` as const;
    dispatch(wsConnect(wsPayload));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <div
        style={{ maxHeight: height }}
        className={`${styles.orderList} scrollbarTrackBorder custom-scroll`}
        ref={scrollTrackRef}
      >
        {validOrders.map((order) => (
          <PublicOrder orderDetails={order} key={order._id} />
        ))}
      </div>
    </section>
  );
}

export default ListFeedOrdersSection;
