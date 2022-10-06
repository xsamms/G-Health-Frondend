import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.0.2.2:5002/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/product/`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
