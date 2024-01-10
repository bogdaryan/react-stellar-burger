import axios from "axios";
import { URL } from "./constants";
import {
  getAccessToken,
  getRefreshToken,
  setUserDataToLocalStorage,
} from "./helpers";

export const axiosInstance = axios.create({
  baseURL: URL,
});

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.data.accessToken) {
      setUserDataToLocalStorage(res.data);
    }

    return res;
  },
  async (err) => {
    const errorMessage = err.response.data.message;
    if (errorMessage === "jwt expired") {
      await getNewToken();
    }
  }
);

export const login = ({ email, password }) => {
  const request = axiosInstance.post("/auth/login", {
    email,
    password,
  });

  return request;
};

export const register = ({ name, email, password }) => {
  const request = axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });

  return request;
};

export const logout = (refreshToken) => {
  axiosInstance.post("/auth/logout", {
    token: refreshToken,
  });
};

export const sendCodeToEmail = (email) => {
  axiosInstance.post("/password-reset", { email });
};

export const resetPassword = ({ password, code }) => {
  axiosInstance.post("/password-reset/reset", {
    password: password,
    token: code,
  });
};

export const patchUser = (formData) => {
  axiosInstance.patch("auth/user", formData, {
    headers: { Authorization: getAccessToken() },
  });
};
export const getUser = () => {
  const request = axiosInstance.get("/auth/user", {
    headers: {
      authorization: getAccessToken(),
    },
  });

  return request;
};

export const getNewToken = async () => {
  await axiosInstance.post("/auth/token", {
    token: getRefreshToken(),
  });
};
