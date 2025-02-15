import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../../project";

interface InitialStateInterface {
  activeCustomer: Customer;
  customers: Customer[];
}

const initialState: InitialStateInterface = {
  activeCustomer: {
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
  customers: [],
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    setActiveCustomer: (state, action: PayloadAction<Customer>) => {
      state.activeCustomer = action.payload;
    },
  },
});

export const { setActiveCustomer, setCustomers } = customerSlice.actions;
