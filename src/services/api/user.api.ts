import { getRefreshToken } from "../../utils/helpers";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({ url: "/auth/user" }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        body: {
          email,
          password,
        },
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "/auth/register",
        body: {
          name,
          email,
          password,
        },
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        body: {
          token: getRefreshToken(),
        },
        method: "POST",
      }),
    }),
    sendResetPasswordCode: builder.mutation({
      query: (email) => ({
        url: "/password-reset",
        body: { email },
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, code }) => ({
        url: "/password-reset/reset",
        body: {
          password: password,
          token: code,
        },
        method: "POST",
      }),
    }),
    editUser: builder.mutation({
      query: (formData) => ({
        url: "/auth/user",
        body: formData,
        method: "PATCH",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        localStorage.setItem("user", JSON.stringify(data.user));
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLogoutMutation,
  useSendResetPasswordCodeMutation,
  useResetPasswordMutation,
  useEditUserMutation,
} = userApi;
