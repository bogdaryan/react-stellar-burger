import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../utils/constants";
import {
  getAccessToken,
  getRefreshToken,
  setUserDataToLocalStorage,
} from "../../utils/helpers";
import { setUser } from "../user/user";

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (!token) return;

    headers.set("authorization", token);

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.data) {
    // Logout
    if (result.data.message === "Successful logout") {
      localStorage.clear();
      window.location.reload();
    }
    // Get user data
    if (result.data?.accessToken) {
      let { success: _, ...userData } = result.data;
      api.dispatch(setUser(userData.user));
      setUserDataToLocalStorage(userData);
    }
  }

  // Get new tokens
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/token",
        method: "POST",
        body: { token: getRefreshToken() },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { success: _, ...tokens } = refreshResult.data;
      setUserDataToLocalStorage(tokens);
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
