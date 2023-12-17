import styles from "./list-orders-section.module.css";

import Order from "./order/order";

const ListOrdersSection = () => {
  return (
    <section className={styles.container}>
      <ul className={`${styles.orderList} custom-scroll`}>
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
      </ul>
    </section>
  );
};

export default ListOrdersSection;
