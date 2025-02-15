import { Invoice } from "../../../project";
import { baseApiConfig, INVOICE_BASE_URL } from "../config";
import { createApi } from "@reduxjs/toolkit/query/react";

export const invoiceController = createApi({
  reducerPath: "invoiceController",
  baseQuery: baseApiConfig,
  tagTypes: ["Invoice"],
  endpoints: (build) => ({
    getInvoices: build.query<Invoice[], void>({
      query: () => INVOICE_BASE_URL,
      providesTags: ["Invoice"],
    }),
    postInvoice: build.mutation<void, Invoice>({
      query: (body) => ({
        url: INVOICE_BASE_URL,
        method: "POST",
        body,
      }),
    }),
    putInvoice: build.mutation<void, Invoice>({
      query: (body) => ({
        url: INVOICE_BASE_URL,
        method: "PUT",
        body,
      }),
    }),
    deleteInvoice: build.mutation<void, string>({
      query: (id) => ({
        url: `${INVOICE_BASE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetInvoicesQuery,
  usePostInvoiceMutation,
  usePutInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceController;
