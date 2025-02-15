import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Seller } from "../../project";

interface InitialStateInterface {
  activeSeller: Seller;
  sellers: Seller[];
}

const initialState: InitialStateInterface = {
  activeSeller: {
    id: null,
    identification: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    createdAt: null,
    active: null,
  },
  sellers: [],
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setSellers: (state, action: PayloadAction<Seller[]>) => {
      state.sellers = action.payload;
    },
    setActiveSeller: (state, action: PayloadAction<Seller>) => {
      state.activeSeller = action.payload;
    },
  },
});

export const { setActiveSeller, setSellers } = sellerSlice.actions;
