import { createSelector } from "@reduxjs/toolkit";
import { countIngredients } from "../../utils/helpers";
import { TIngredient } from "../../types/types";
import { RootStore } from "../index";

export const getIngredients = (store: RootStore): TIngredient[] =>
  store.ingredients.ingredients;
export const getConstructorBun = (store: RootStore): TIngredient | null =>
  store.ingredientsConstructor.bun;
export const getConstructorIngredients = (store: RootStore): TIngredient[] =>
  store.ingredientsConstructor.ingredients;

export const getIngredientDetails = (store: RootStore) =>
  store.ingredientDetails.ingredientDetails;

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
    const items = bun ? [bun, ...ingredients] : ingredients;
    return countIngredients(items);
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
