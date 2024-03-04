import styles from "./order-counter.module.css";

type Props = {
  readonly count: number | null;
  readonly title?: string | null;
};

const OrderCounter = ({ count = 0, title }: Props) => {
  return (
    <section className="mt-15">
      <h2 className="text text_type_main-medium">{title}</h2>
      <p className={`${styles.numbers} text text_type_digits-large`}>{count}</p>
    </section>
  );
};

export function NumberOrdersForAllTime({ count }: Props) {
  return <OrderCounter count={count} title={"Выполнено за все время:"} />;
}
export function NumberOrdersToday({ count }: Props) {
  return <OrderCounter count={count} title={"Выполнено за сегодня:"} />;
}

export default OrderCounter;
