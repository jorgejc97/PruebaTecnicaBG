import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthInfo, JWTInfo } from "../../auth";

const initialState: AuthInfo = {
  status: "checking",
  jwtInfo: {
    token: "",
    expiracion: "",
    userInfo: {
      id: "",
      nameCompany: "",
      phoneNumber: "",
      email: "",
      iva: 0,
      city: "",
      regionProvince: "",
      address: "",
      zipcode: 0,
    },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checking: (state) => {
      state.status = "checking";
    },
    login: (state, action: PayloadAction<JWTInfo>) => {
      state.status = "authenticated";
      state.jwtInfo = action.payload;
    },
    logout: (state) => {
      state.status = "not-authenticated";
      state.jwtInfo = initialState.jwtInfo;
    },
  },
});

export const { login, logout, checking } = authSlice.actions;
