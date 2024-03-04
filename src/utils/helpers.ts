import { TCounter, TIngredient, TOrderDetails } from "../types/types";

export const setUserDataToLocalStorage = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const calculateOrderPrice = (ingredients: TIngredient[]) => {
  return ingredients.reduce((acc, ingredient) => (acc += ingredient.price), 0);
};

export function countIngredients(ingredients: TIngredient[]) {
  const counters: TCounter = {};

  ingredients
    .filter((i) => i)
    .forEach(({ name, type }) => {
      if (type === "bun") {
        counters[name] = 2;
      } else {
        counters[name] = (counters[name] || 0) + 1;
      }
    });

  return counters;
}

export const cutIngredients = (ingredients: TIngredient[]) => {
  let visibleIngredients;
  let hiddenIngredients;

  if (ingredients.length <= 6) {
    visibleIngredients = ingredients;
  }

  if (ingredients.length > 5) {
    hiddenIngredients = ingredients.splice(6, ingredients.length - 6);
  }

  return { visibleIngredients, hiddenIngredients };
};

export const updateOrder = (order: TOrderDetails) => {
  for (let key in order) {
    if (key === "status") {
      const status = order[key];

      switch (status) {
        case "done":
          order.statusDetails = { title: "Выполнен", className: "success" };
          break;
        case "canceled":
          order.statusDetails = { title: "Отменен", className: "canceled" };
          break;
        case "generated":
        case "pending":
          order.statusDetails = { title: "Готовится ", className: "pending" };
          break;
        default:
          break;
      }
    }

    if (key === "ingredients") {
      const ingredients = order[key];
      const counters = countIngredients(ingredients);
      order.counters = counters;
    }
  }

  return order;
};
