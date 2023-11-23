export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "REMOVE_INGREDIENT";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export const deleteIngredient = (id) => ({
  type: DELETE_INGREDIENT,
  payload: id,
});

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
});

export const clearConstructor = () => ({ type: CLEAR_CONSTRUCTOR });
