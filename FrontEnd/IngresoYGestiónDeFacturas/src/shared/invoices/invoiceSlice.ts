import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice } from "../../project";

interface InitialStateInterface {
  activeInvoice: Invoice;
  invoices: Invoice[];
}

const initialState: InitialStateInterface = {
  activeInvoice: {
    id: null,
    number: 0,
    companyId: "",
    customerId: "",
    sellerId: "",
    paymentMethod: "",
    paymentStatus: "",
    subTotal: 0,
    iva: 0,
    total: 0,
    createdAt: null,
    invoiceDetail: [],
  },
  invoices: [],
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload;
    },
    setActiveInvoice: (state, action: PayloadAction<Invoice>) => {
      state.activeInvoice = action.payload;
    },
  },
});

export const { setActiveInvoice, setInvoices } = invoiceSlice.actions;
