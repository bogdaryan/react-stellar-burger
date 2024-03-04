import { TUseForm } from "../../types/types";
import { getRefreshToken } from "../../utils/helpers";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({ url: "/auth/user" }),
    }),
    login: builder.mutation({
      query: ({ email, password }: TUseForm) => ({
        url: "/auth/login",
        body: {
          email,
          password,
        },
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: ({ name, email, password }: TUseForm) => ({
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
      query: (email: TUseForm) => ({
        url: "/password-reset",
        body: { email },
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, code }: TUseForm) => ({
        url: "/password-reset/reset",
        body: {
          password: password,
          token: code,
        },
        method: "POST",
      }),
    }),
    editUser: builder.mutation({
      query: (formData: TUseForm) => ({
        url: "/auth/user",
        body: formData,
        method: "PATCH",
      }),
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
