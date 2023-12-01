import axios from "axios";
import { URL } from "../utils/constants";

import { setOrderNumber } from "../services/modalSlice";

export const postOrder = (ingredients) => {
  return (dispatch) => {
    axios
      .post(`${URL}/orders`, { ingredients })
      .then(({ data }) => {
        if (data.success) {
          dispatch(setOrderNumber(data.order.number));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
