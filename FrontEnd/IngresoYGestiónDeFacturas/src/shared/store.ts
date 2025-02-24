import { authSlice } from "./auth";
import {
  authController,
  customerController,
  invoiceController,
  productController,
  sellerController,
} from "../services";
import { configureStore } from "@reduxjs/toolkit";
import { sellerSlice } from "./sellers";
import { customerSlice } from "./customers";
import { productSlice } from "./products";
import { invoiceSlice } from "./invoices";

export const store = configureStore({
  reducer: {
    //*Auth
    auth: authSlice.reducer,
    //*Seller
    seller: sellerSlice.reducer,
    //*Customer
    customer: customerSlice.reducer,
    //*Product
    product: productSlice.reducer,
    //invoice
    invoice: invoiceSlice.reducer,

    //*Api
    [authController.reducerPath]: authController.reducer,
    [sellerController.reducerPath]: sellerController.reducer,
    [customerController.reducerPath]: customerController.reducer,
    [productController.reducerPath]: productController.reducer,
    [invoiceController.reducerPath]: invoiceController.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authController.middleware)
      .concat(sellerController.middleware)
      .concat(customerController.middleware)
      .concat(productController.middleware)
      .concat(invoiceController.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
