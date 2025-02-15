import { Customer } from "../../../project";
import { baseApiConfig, CUSTOMER_BASE_URL, SELLER_BASE_URL } from "../config";
import { createApi } from "@reduxjs/toolkit/query/react";

export const customerController = createApi({
  reducerPath: "customerController",
  baseQuery: baseApiConfig,
  tagTypes: ["Customer"],
  endpoints: (build) => ({
    getCustomers: build.query<Customer[], void>({
      query: () => CUSTOMER_BASE_URL,
      providesTags: ["Customer"],
    }),
    postCustomer: build.mutation<void, Customer>({
      query: (body) => ({
        url: CUSTOMER_BASE_URL,
        method: "POST",
        body,
      }),
    }),
    putCustomer: build.mutation<void, Customer>({
      query: (body) => ({
        url: CUSTOMER_BASE_URL,
        method: "PUT",
        body,
      }),
    }),
    deleteCustomer: build.mutation<void, string>({
      query: (id) => ({
        url: `${SELLER_BASE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetCustomersQuery,
  usePostCustomerMutation,
  usePutCustomerMutation,
  useDeleteCustomerMutation,
} = customerController;
