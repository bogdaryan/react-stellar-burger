import { useReducer } from "react";
import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
} from "./actions";

const _state = {
  bun: null,
  ingredients: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      if (action.payload.type !== "bun") {
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload],
        };
      }

      return {
        ...state,
        bun: action.payload,
      };

    case DELETE_INGREDIENT:
      const newIngredients = state.ingredients.filter(
        (el) => el._idConstructor !== action.payload
      );

      return { ...state, ingredients: newIngredients };

    case CLEAR_CONSTRUCTOR:
      return (state = _state);
    default:
      return state;
  }
}

const useIngredientReducer = () => {
  return useReducer(reducer, _state);
};

export default useIngredientReducer;
