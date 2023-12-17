import styles from "./order-composition.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImg from "../../components/ingredient-img/ingredient";

const OrderComposition = () => {
  const tempArr = [
    {
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      name: "Флюоресцентная булка R2-D3",
      count: 2,
      price: "20",
    },
    {
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      name: "Флюоресцентная булка R2-D3",
      count: 2,
      price: 350,
    },
    {
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      name: "Флюоресцентная булка R2-D3",
      count: 1,
      price: 200,
    },
    {
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      name: "Флюоресцентная булка R2-D3",
      count: 1,
      price: 200,
    },
    {
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      name: "Флюоресцентная булка R2-D3",
      count: 1,
      price: 200,
    },
    {
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      name: "Флюоресцентная булка R2-D3",
      count: 1,
      price: 200,
    },
    {
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      name: "Флюоресцентная булка R2-D3",
      count: 1,
      price: 200,
    },
    {
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      name: "Флюоресцентная булка R2-D3",
      count: 1,
      price: 200,
    },
  ];

  return (
    <section className="container">
      <div className={styles.inner}>
        <p className="text text_type_digits-default">#034533</p>
        <p className="text text_type_main-medium mt-10 mb-3">
          Black Hole Singularity острый бургер
        </p>
        <p className={`${styles.status} text text_type_main-default mb-15`}>
          Выполнен
        </p>
        <p className={`${styles.listTitle} text text_type_main-medium mb-6`}>
          Состав:
        </p>
        <ul className={`${styles.list} custom-scroll mr-6`}>
          {tempArr.map(({ image, name, count, price }) => {
            return (
              <li className={styles.ingredient}>
                <IngredientImg image={image} className={styles.ingredientImg} />
                <p className="text text_type_main-default ml-4">{name}</p>
                <div className={styles.countPrice}>
                  <p className="text text_type_digits-default">
                    <span>{count}</span> x <span>{price}</span>
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={`${styles.footer} mt-10`}>
          <p className="text text_type_main-default">Вчера, 13:50 i-GMT+3</p>
          <div className={styles.totalWrapper}>
            <p className="text text_type_digits-default">{510}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderComposition;
