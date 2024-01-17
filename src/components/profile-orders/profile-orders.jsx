import styles from "./profile-orders.module.css";
import { useState, useRef, useEffect } from "react";

import { Order as OrderTemplate } from "../order/order";

import useHeight from "../../hooks/useHeight";
import { useDispatch } from "react-redux";
import { wsConectionStart } from "../../services/websoket/actions";
import { wsURL } from "../../utils/constants";
import { getAccessToken } from "../../utils/helpers";

const Order = () => <OrderTemplate isUserHistoryOrder={true} />;

const ProfileOrders = () => {
  const [scrollHeight, setScrollHeight] = useState(null);
  const scrollTrackRef = useRef();
  const height = useHeight(scrollTrackRef, 0);

  useEffect(() => {
    setScrollHeight(height);
  }, [height, setScrollHeight]);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAccessToken("noBearer");

    dispatch(wsConectionStart(`${wsURL}?token=${token}`));
  }, []);

  return (
    <section className={styles.container}>
      <ul
        style={{
          maxHeight: scrollHeight,
        }}
        className={`${styles.list} ${styles.scroll} scrollbarTrackBorder custom-scroll`}
        ref={scrollTrackRef}
      >
        <Order />
        <Order />
        <Order />
        <Order />
      </ul>
    </section>
  );
};

export default ProfileOrders;
