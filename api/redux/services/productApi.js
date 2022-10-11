import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://g-health.herokuapp.com/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/product/`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
