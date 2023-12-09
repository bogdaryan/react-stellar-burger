import axios from "axios";
import { URL } from "../utils/constants";

import {
  getIngredients,
  getIngredientsSuccess,
  getIngredientsFailed,
} from "../services/ingredientsSlice";

export const fetchIngredients = () => {
  return (dispatch) => {
    dispatch(getIngredients());

    axios
      .get(`${URL}/ingredients`)
      .then(({ data }) => {
        if (data) {
          dispatch(getIngredientsSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getIngredientsFailed());
      });
  };
};
