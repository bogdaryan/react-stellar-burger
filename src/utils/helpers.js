export const setUserDataToLocalStorage = ({
  accessToken,
  refreshToken,
  user,
}) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const calculateOrderPrice = (ingredients) => {
  return ingredients.reduce((acc, ingredient) => (acc += ingredient.price), 0);
};

export const countIngredients = (options) => {
  const { bun = false, ingredients = [] } = options || {};

  const counters = {};

  ingredients.forEach(({ name, type }) => {
    if (!bun && type === "bun") {
      return (counters[name] = 2);
    }
    counters[name] = (counters[name] || 0) + 1;
  });

  if (bun) {
    counters[bun.name] = 2;
  }

  return counters;
};

export const cutIngredients = (ingredients) => {
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

export const updateOrder = (order) => {
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
      const counters = countIngredients({ ingredients });
      order.counters = counters;
    }
  }

  return order;
};
