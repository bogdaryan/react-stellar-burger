import { createSelector } from "@reduxjs/toolkit";

import {
  calculateOrderPrice,
  cutIngredients,
  updateOrder,
} from "../../utils/helpers";

import { getIngredients } from "../ingredients/selectors";

import { RootStore } from "../index";
import { TIngredient, TOrderDetails, TWebSocketOrder } from "../../types/types";

type TGetTotal = (store: RootStore) => number;
type TGetTotalToday = (store: RootStore) => number;
type TFeedOrders = (store: RootStore) => TWebSocketOrder[];

export const getTotal: TGetTotal = (store) => store.wsFeed.total;
export const getTotalToday: TGetTotalToday = (store) => store.wsFeed.totalToday;
export const getPublicFeed: TFeedOrders = (store) => store.wsFeed.orders;
export const getUserFeed: TFeedOrders = (store) => store.wsUserOrderFeed.orders;

function addDetailsToOrder(getOrders: any) {
  return createSelector(
    getIngredients,
    getOrders,
    (ingredients: any, orders: TWebSocketOrder[]) => {
      const details: TOrderDetails[] = [];

      orders.forEach((order: TWebSocketOrder) => {
        const ingredientsIds = order.ingredients;

        const ingredientsDetails = ingredientsIds.map((id) => {
          const ingredientDetails = ingredients.find(
            (ingredient: TIngredient) => ingredient._id === id
          );

          return ingredientDetails;
        });

        details.push({ ...order, ingredients: ingredientsDetails });
      });

      return details;
    }
  );
}

function getValidOrders(getOrdersWithDetails: any) {
  return createSelector(getOrdersWithDetails, (orders) => {
    return orders
      .filter((order: TOrderDetails) => {
        const ingredientsLength = order.ingredients.length;

        const numberOfBun = order.ingredients.reduce((acc, ingredient) => {
          const isBun = ingredient?.type === "bun";
          if (isBun) {
            return (acc += 1);
          }

          return acc;
        }, 0);

        if (ingredientsLength < 1 || numberOfBun > 2) return null;

        return order;
      })
      .map((order: TOrderDetails) => {
        const { ingredients } = order;
        const isFirstBun = ingredients[0]?.type === "bun";
        const isLastBun = ingredients[ingredients.length - 1]?.type === "bun";
        const isValidOrder = isFirstBun && isLastBun;

        if (isValidOrder) {
          const price = calculateOrderPrice(ingredients);
          ingredients.pop();
          const updatedOrder = updateOrder(order);
          const { hiddenIngredients } = cutIngredients(ingredients);

          return { ...updatedOrder, hiddenIngredients, price: price };
        }

        return null;
      })
      .filter(Boolean);
  });
}

function handleValidOrders(getFeedOrders: TFeedOrders) {
  const makeOrdersWithDetails = addDetailsToOrder(getFeedOrders);
  const validOrders = getValidOrders(makeOrdersWithDetails);

  return validOrders;
}

export const getValidPublicFeed = handleValidOrders(getPublicFeed);
export const getValidUserFeed = handleValidOrders(getUserFeed);

// @ts-nocheck
