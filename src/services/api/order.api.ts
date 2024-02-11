import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (ids) => ({
        url: "/orders",
        body: {
          ingredients: ids,
        },
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
