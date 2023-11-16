import axios from "axios";
import { URL } from "./constants";

export default function getIngredients() {
  return axios
    .get(`${URL}/ingredients`)
    .then(({ data }) => data.data)
    .catch((error) => {
      throw new Error(error);
    });
}
