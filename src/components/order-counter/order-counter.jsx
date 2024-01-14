import styles from "./order-counter.module.css";

const OrderCounter = ({ count = 0, title }) => {
  return (
    <section className="mt-15">
      <h2 className="text text_type_main-medium">{title}</h2>
      <p className={`${styles.numbers} text text_type_digits-large`}>{count}</p>
    </section>
  );
};

export default OrderCounter;
