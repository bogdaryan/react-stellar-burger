import ingredients from "../services/ingredients/ingredients";

export const setUserDataToLocalStorage = ({
  accessToken,
  refreshToken,
  user,
}) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const countOrderPrice = (ingredients) => {
  return ingredients.reduce((acc, ingredient) => (acc += ingredient.price), 0);
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
