import { authSlice } from "./auth";

import { authController } from "../services";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    //*Auth
    auth: authSlice.reducer,

    //*Api
    [authController.reducerPath]: authController.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authController.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
