import { Invoice } from "../../project";
import { setActiveInvoice, setInvoices } from "../invoices";

import { useAppStore } from "./useAppStore";

export const useInvoiceStore = () => {
  const {
    invoice: { activeInvoice, invoices },
    dispatch,
  } = useAppStore();

  const onSetActiveInvoice = (invoice: Invoice) => {
    dispatch(setActiveInvoice(invoice));
  };

  const onSetInvoices = (invoices: Invoice[]) => {
    dispatch(setInvoices(invoices));
  };

  return { activeInvoice, invoices, onSetActiveInvoice, onSetInvoices };
};
