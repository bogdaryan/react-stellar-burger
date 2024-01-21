import styles from "./profile-orders.module.css";
import { useState, useRef, useEffect } from "react";

import { Order as OrderTemplate } from "../order/order";

import useHeight from "../../hooks/useHeight";
import { useDispatch, useSelector } from "react-redux";
import { wsConectionStart } from "../../services/websoket/actions";
import { wsURL } from "../../utils/constants";
import { getAccessToken } from "../../utils/helpers";
// import { getOnlyValidFeedUser } from "../../services/websoket/selectors";
import { Link } from "react-router-dom";

const Order = (order) => <OrderTemplate {...order} isUserHistoryOrder={true} />;

const ProfileOrders = () => {
  const dispatch = useDispatch();
  // const validOrders = useSelector(getOnlyValidFeedUser);
  const [scrollHeight, setScrollHeight] = useState(null);
  const scrollTrackRef = useRef();
  const height = useHeight(scrollTrackRef, 0);

  useEffect(() => {
    setScrollHeight(height);
  }, [height, setScrollHeight]);

  useEffect(() => {
    let token = getAccessToken("noBearer");
    token = token.split(" ")[1];

    dispatch(wsConectionStart(`${wsURL}/orders?token=${token}`));
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <ul
        style={{
          maxHeight: scrollHeight,
        }}
        className={`${styles.list} ${styles.scroll} scrollbarTrackBorder custom-scroll`}
        ref={scrollTrackRef}
      >
        {/* {validOrders && validOrders.length ? (
          validOrders.map((order) => {
            const { number, _id } = order;

            return (
              <Link className={styles.link} to={number} key={_id}>
                <Order orderDetails={order} />
              </Link>
            );
          })
        ) : (
          <h2>Нет заказов</h2>
        )} */}
      </ul>
    </section>
  );
};

export default ProfileOrders;
