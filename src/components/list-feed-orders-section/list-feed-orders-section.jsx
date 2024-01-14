import styles from "./list-feed-orders-section.module.css";

import { useEffect, useRef, useState } from "react";
import useHeight from "../../hooks/useHeight";

import { Order } from "../order/order";

const ListFeedOrdersSection = () => {
  const [scrollHeight, setScrollHeight] = useState(null);
  const scrollTrackRef = useRef();
  const height = useHeight(scrollTrackRef);

  useEffect(() => {
    setScrollHeight(height);
  }, [height, setScrollHeight]);

  return (
    <section className={styles.container}>
      <ul
        style={{ maxHeight: scrollHeight }}
        className={`${styles.orderList} scrollbarTrackBorder custom-scroll`}
        ref={scrollTrackRef}
      >
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
      </ul>
    </section>
  );
};

export default ListFeedOrdersSection;
