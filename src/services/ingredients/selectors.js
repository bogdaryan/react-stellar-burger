import { createSelector } from "@reduxjs/toolkit";
import { countIngredients } from "../../utils/helpers";

// ITEMS
export const getIngredients = (store) => store.ingredientsApi.ingredients;
export const getConstructorBun = (store) => store.ingredients.bun;
export const getConstructorIngredients = (store) =>
  store.ingredients.constructorIngredients;

// STATUSES
export const getIngredientsRequestStatus = (store) => store.ingredientsApi;

//
export const getConstructorItems = createSelector(
  getConstructorBun,
  getConstructorIngredients,
  (bun, ingredients) => ({
    bun,
    ingredients,
  })
);

export const getPrice = createSelector(
  getConstructorItems,
  ({ bun, ingredients }) => {
    return (
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((acc, i) => {
        return acc + i.price;
      }, 0)
    );
  }
);

export const getIngredientsCounters = createSelector(
  getConstructorItems,
  ({ bun, ingredients }) => {
    const counters = countIngredients({ bun, ingredients });

    return counters;
  }
);

export const getConstructorItemsIds = createSelector(
  getConstructorItems,
  ({ bun, ingredients }) => {
    if (!ingredients || !bun) return;

    const ingredientIds = [bun._id];

    for (let item of ingredients) {
      ingredientIds.push(item._id);
    }

    ingredientIds.push(bun._id);

    return ingredientIds;
  }
);
