import styles from "./number-order-status.module.css";

type Props = {
  title?: string;
  orderNumbers: Set<number>;
  classNameSuccess?: string | null;
};

function NumberOrderStatus({
  title,
  orderNumbers,
  classNameSuccess = null,
}: Props) {
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <ul className={styles.list}>
        {Array.from(orderNumbers)
          .sort((a, b) => b - a)
          .slice(0, 10)
          .map((number, idx) => {
            return (
              <li
                className={`${styles.number} ${classNameSuccess} text text_type_digits-default`}
                key={idx}
              >
                {number}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export function OrdersDone({ orderNumbers }: Props) {
  return (
    <NumberOrderStatus
      orderNumbers={orderNumbers}
      title={"Готовы:"}
      classNameSuccess={styles.success}
    />
  );
}

export function OrdersPending({ orderNumbers }: Props) {
  return <NumberOrderStatus orderNumbers={orderNumbers} title={"В работе:"} />;
}
