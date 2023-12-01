import axios from "axios";
import { URL } from "../utils/constants";

import { loadIngredients } from "../services/ingredientsSlice";

export const fetchIngredients = () => {
  return (dispatch) => {
    axios
      .get(`${URL}/ingredients`)
      .then(({ data }) => dispatch(loadIngredients(data.data)))
      .catch((error) => {
        throw new Error(error);
      });
  };
};
