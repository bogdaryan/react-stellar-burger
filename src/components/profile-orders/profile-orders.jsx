import styles from "./profile-orders.module.css";
import { useState, useRef, useEffect } from "react";

import { Order as OrderTemplate } from "../order/order";

import useHeight from "../../hooks/useHeight";
import { useDispatch, useSelector } from "react-redux";
import { wsConnect } from "../../services/websoket/actions";
import { wsURL } from "../../utils/constants";
import { getAccessToken } from "../../utils/helpers";
import { getOnlyValidFeedUser } from "../../services/websoket/selectors";
import { Link, Outlet } from "react-router-dom";

const Order = (order) => <OrderTemplate {...order} isUserHistoryOrder={true} />;

const ProfileOrders = () => {
  const dispatch = useDispatch();
  let validOrders = useSelector(getOnlyValidFeedUser);

  const [scrollHeight, setScrollHeight] = useState(null);
  const scrollTrackRef = useRef();
  const height = useHeight(scrollTrackRef, 0);

  useEffect(() => {
    setScrollHeight(height);

    let token = getAccessToken();
    token = token.split(" ")[1];

    dispatch(wsConnect(`${wsURL}/orders?token=${token}`));
  }, [dispatch, height]);

  return (
    <>
      <section className={styles.container}>
        <ul
          style={{
            maxHeight: scrollHeight,
          }}
          className={`${styles.list} ${styles.scroll} scrollbarTrackBorder custom-scroll`}
          ref={scrollTrackRef}
        >
          {validOrders && validOrders.length ? (
            validOrders
              .sort((a, b) => b.number - a.number)
              .slice(0, 50)
              .map((order) => {
                const { number, _id, status } = order;

                return (
                  <Link className={styles.link} to={`${number}`} key={_id}>
                    <Order orderDetails={order} status={status} />
                  </Link>
                );
              })
          ) : (
            <h2>Нет заказов</h2>
          )}
        </ul>
      </section>
      <Outlet />
    </>
  );
};

export default ProfileOrders;
