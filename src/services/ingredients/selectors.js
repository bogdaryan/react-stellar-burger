import { createSelector } from "@reduxjs/toolkit";

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
    const counters = {};
    ingredients.forEach((ingredient) => {
      if (!ingredient) return;

      counters[ingredient.name] = (counters[ingredient.name] || 0) + 1;
    });

    if (bun) {
      counters[bun.name] = 2;
    }

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
