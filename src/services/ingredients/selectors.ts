import { createSelector } from "@reduxjs/toolkit";
import { countIngredients } from "../../utils/helpers";
import { TIngredient } from "../../types/types";
import { RootStore } from "../index";

export const getIngredients = (store: RootStore) =>
  store.ingredients.ingredients;
export const getConstructorBun = (store: RootStore) =>
  store.ingredientsConstructor.bun;
export const getConstructorIngredients = (store: RootStore) =>
  store.ingredientsConstructor.ingredients;

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
      ingredients.reduce((acc, i: TIngredient) => {
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
