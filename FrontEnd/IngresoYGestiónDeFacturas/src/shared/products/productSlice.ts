import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../project";

interface InitialStateInterface {
  activeProduct: Product;
  products: Product[];
}

const initialState: InitialStateInterface = {
  activeProduct: {
    id: null,
    code: "",
    name: "",
    quantity: 0,
    unitPrice: 0.0,
    createdAt: null,
    active: null,
  },
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setActiveProduct: (state, action: PayloadAction<Product>) => {
      state.activeProduct = action.payload;
    },
  },
});

export const { setActiveProduct, setProducts } = productSlice.actions;
