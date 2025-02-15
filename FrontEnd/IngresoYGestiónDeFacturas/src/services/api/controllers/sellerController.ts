import { Seller } from "../../../project";
import { baseApiConfig, SELLER_BASE_URL } from "../config";
import { createApi } from "@reduxjs/toolkit/query/react";

export const sellerController = createApi({
  reducerPath: "sellerController",
  baseQuery: baseApiConfig,
  tagTypes: ["Seller"],
  endpoints: (build) => ({
    getSellers: build.query<Seller[], void>({
      query: () => SELLER_BASE_URL,
      providesTags: ["Seller"],
    }),
    postSeller: build.mutation<void, Seller>({
      query: (body) => ({
        url: SELLER_BASE_URL,
        method: "POST",
        body,
      }),
    }),
    putSeller: build.mutation<void, Seller>({
      query: (body) => ({
        url: SELLER_BASE_URL,
        method: "PUT",
        body,
      }),
    }),
    deleteSeller: build.mutation<void, string>({
      query: (id) => ({
        url: `${SELLER_BASE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetSellersQuery,
  usePostSellerMutation,
  usePutSellerMutation,
  useDeleteSellerMutation,
} = sellerController;
