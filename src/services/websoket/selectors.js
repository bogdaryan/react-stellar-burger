import { createSelector } from "@reduxjs/toolkit";
import { getIngredients } from "../ingredients/selectors";

export const getTotal = (store) => store.wsFeed.total;
export const getTotalToday = (store) => store.wsFeed.totalToday;
export const getFeedOrders = (store) => store.wsFeed.orders;
export const getStatusWsFeed = (store) => store.wsFeed.wsConnected;

export const getWsFeed = (store) => store.wsFeed;

export const getOrderIngredientsIds = createSelector(
  getFeedOrders,
  (orders) => {
    const ids = [];
    orders.forEach((order) => ids.push(order.ingredients));
    return ids;
  }
);

export const getOrderDetails = createSelector(
  getOrderIngredientsIds,
  getIngredients,
  (orderIds, ingredients) => {
    const details = [];

    orderIds.forEach((ids) => {
      const orderDetails = ids.map((id) => {
        return ingredients.find((ingredient) => ingredient._id === id);
      });

      details.push(orderDetails);
    });

    return details;
  }
);
