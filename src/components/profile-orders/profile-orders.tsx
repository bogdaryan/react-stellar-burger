import styles from "./profile-orders.module.css";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "../../hooks/hooks";
import { Outlet } from "react-router-dom";

import { UserOrder } from "../order/order";
import { getValidUserFeed } from "../../services/websoket/selectors";
import useViewportHeight from "../../hooks/useViewportHeight";
import { getAccessToken } from "../../utils/helpers";
import { wsConnect, wsDisconnect } from "../../services/websoket/actions";
import { wsURL } from "../../utils/constants";

function ProfileOrders() {
  const dispatch = useDispatch();
  const validOrders = useSelector(getValidUserFeed);
  const scrollTrackRef = useRef(null);
  const height = useViewportHeight(scrollTrackRef, 0);

  useEffect(() => {
    let token = getAccessToken();
    token = token ? token.split(" ")[1] : null;

    const wsPayload = `${wsURL}/orders?token=${token}` as const;

    dispatch(wsConnect(wsPayload));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch, height]);

  return (
    <>
      <section className={styles.container}>
        <ul
          style={{
            maxHeight: height,
          }}
          className={`${styles.list} ${styles.scroll} scrollbarTrackBorder custom-scroll`}
          ref={scrollTrackRef}
        >
          {validOrders && validOrders.length ? (
            validOrders
              .filter((order) => order !== null)
              .filter(Boolean)
              .sort((a, b) => (a && b ? b.number - a.number : 0))
              .slice(0, 50)
              .map((order) => {
                return (
                  order && <UserOrder orderDetails={order} key={order._id} />
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
}

export default ProfileOrders;
