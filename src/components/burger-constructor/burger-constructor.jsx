import style from "./burger-constructor.module.css";

import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import IngredientsList from "./ingredients-list/ingredients-list";

import { postOrder } from "../../asyncActions/postOrder";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import currencyIcon from "../../images/currency_icon.svg";

function BurgerConstructor({ scrollHeight }) {
  const dispatch = useDispatch();
  const bun = useSelector((store) => store.ingredients.bun);
  const ingredients = useSelector(
    (store) => store.ingredients.constructorIngredients
  );

  const totalPrice = useMemo(() => {
    const ingredientsPrice = ingredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );
    const bunPrice = bun ? bun.price * 2 : 0;

    return ingredientsPrice + bunPrice;
  }, [ingredients, bun]);

  const ids = useMemo(() => {
    if (!ingredients || !bun) return;

    const ingredientIds = [bun._id];

    for (let item of ingredients) {
      ingredientIds.push(item._id);
    }

    ingredientIds.push(bun._id);

    return ingredientIds;
  }, [ingredients, bun]);

  const handlePostOrder = () => {
    if (!ids) return;

    dispatch(postOrder(ids));
  };

  return (
    <section className={`${style.constructor} mt-25 pr-4 pl-4`}>
      <IngredientsList scrollHeight={scrollHeight} />
      <div className={`${style.wrapper} pt-10`}>
        <div className={`${style.price} mr-10`}>
          <p className="text text_type_digits-medium">{totalPrice || 0}</p>
          <img src={currencyIcon} alt="Иконка валюты" />
        </div>
        <Button
          onClick={handlePostOrder}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
export default BurgerConstructor;
