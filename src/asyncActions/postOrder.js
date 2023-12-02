import axios from "axios";
import { URL } from "../utils/constants";

import {
  getOrder,
  getOrderSuccess,
  getOrderFailed,
} from "../services/modalSlice";

export const postOrder = (ingredients) => {
  return (dispatch) => {
    dispatch(getOrder());

    axios
      .post(`${URL}/orders`, { ingredients })
      .then(({ data }) => {
        if (data.success) {
          dispatch(getOrderSuccess(data.order.number));
        }
      })
      .catch((error) => {
        dispatch(getOrderFailed());
      });
  };
};
