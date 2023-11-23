import axios from "axios";
import { URL } from "./constants.js";

export function getIngredients() {
  return axios
    .get(`${URL}/ingredients`)
    .then(({ data }) => data.data)
    .catch((error) => {
      throw new Error(error);
    });
}

export function postOrder(ingredients) {
  return axios
    .post(`${URL}/orders`, { ingredients })
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error);
    });
}
