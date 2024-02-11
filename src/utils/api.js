// import axios from "axios";
// import { URL } from "./constants";
// import { getAccessToken, getRefreshToken } from "./helpers";

// export const axiosInstance = axios.create({
//   baseURL: URL,
// });

// export const sendCodeToEmail = (email) => {
//   axiosInstance.post("/password-reset", { email });
// };

// export const resetPassword = ({ password, code }) => {
//   axiosInstance.post("/password-reset/reset", {
//     password: password,
//     token: code,
//   });
// };

// export const patchUser = (formData) => {
//   axiosInstance.patch("auth/user", formData, {
//     headers: { Authorization: getAccessToken() },
//   });
// };
