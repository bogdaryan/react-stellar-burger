import { createSelector } from "@reduxjs/toolkit";

import {
  countOrderPrice,
  cutIngredients,
  updateOrder,
} from "../../utils/helpers";

import { getIngredients } from "../ingredients/selectors";

// const getIngredients = {};

// Feed All //
export const getTotal = (store) => store.wsFeed.total;
export const getTotalToday = (store) => store.wsFeed.totalToday;
export const getFeedOrders = (store) => store.wsFeed.orders;
export const getStatusWsFeed = (store) => store.wsFeed.wsConnected;
//          //

// User Feed //
export const getUserFeedOrders = (store) => store.wsUserOrderFeed.orders;
//           //

export const createOrderDetailsSelector = (getOrders) => {
  return createSelector(getIngredients, getOrders, (ingredients, orders) => {
    // if (!ingredients) return;

    const details = [];

    orders.forEach((order) => {
      const ingredientsIds = order.ingredients;

      const ingredientsDetails = ingredientsIds.map((id) => {
        const ingredientDetails = ingredients.find(
          (ingredient) => ingredient._id === id
        );

        return ingredientDetails;
      });

      details.push({ ...order, ingredients: ingredientsDetails });
    });

    return details;
  });
};

export const getOrderDetailsFeedAll = createOrderDetailsSelector(getFeedOrders);
export const getOrderDetailsFeedUser =
  createOrderDetailsSelector(getUserFeedOrders);

const createCheckValidityOrders = (getOrdersWithDetails) => {
  return createSelector(getOrdersWithDetails, (orders) => {
    return orders
      .filter((order) => {
        const ingredientsLength = order.ingredients.length;

        const numberOfBun = order.ingredients.reduce(
          (acc, ingredient) => (acc += ingredient?.type === "bun"),
          0
        );

        if (ingredientsLength < 1 || numberOfBun > 2) return null;

        return order;
      })
      .map((order) => {
        const { ingredients } = order;
        const isFirstBun = ingredients[0]?.type === "bun";
        const isLastBun = ingredients[ingredients.length - 1]?.type === "bun";
        const isValidOrder = isFirstBun && isLastBun;

        if (isValidOrder) {
          const price = countOrderPrice(ingredients);
          ingredients.pop();
          const updatedOrder = updateOrder(order);
          const { hiddenIngredients } = cutIngredients(ingredients);

          return { ...updatedOrder, hiddenIngredients, price: price };
        }

        return null;
      })
      .filter(Boolean);
  });
};

export const getOnlyValidFeed = createCheckValidityOrders(
  getOrderDetailsFeedAll
);

export const getOnlyValidFeedUser = createCheckValidityOrders(
  getOrderDetailsFeedUser
);
