import { TIngredient } from "../../types/types";
import { setIngredients } from "../ingredients/ingredientsSlice";
import { api } from "./api";

export const ingredientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => "/ingredients",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const ingredients: TIngredient[] = data.data;
          dispatch(setIngredients(ingredients));
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
