import axios from "axios";
import { URL } from "./constants";

export const axiosInstance = axios.create({
  baseURL: URL,
});

axiosInstance.interceptors.response.use(
  (res) => {
    console.log(res);
    // тут проверка токена
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = ({ email, password }) => {
  const request = axiosInstance.post("/auth/login", {
    email,
    password,
  });

  return request;
};

export const getUser = () => {
  const token = localStorage.getItem("accessToken");
  return axiosInstance.get("/auth/user", {
    headers: {
      authorization: token,
    },
  });
};

// export const getNewToken = (refreshToken) => {
//   return axios
//     .post(`${auth}/token`, {
//       token: refreshToken,
//     })
//     .then((res) => console.log(res));
// };
