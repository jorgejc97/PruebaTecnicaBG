import { Customer } from "../../project";
import { setActiveCustomer, setCustomers } from "../customers";
import { useAppStore } from "./useAppStore";

export const useCustomerStore = () => {
  const {
    customer: { activeCustomer, customers },
    dispatch,
  } = useAppStore();

  const onSetActiveCustomer = (customer: Customer) => {
    dispatch(setActiveCustomer(customer));
  };

  const onSetCustomers = (customers: Customer[]) => {
    dispatch(setCustomers(customers));
  };

  return { activeCustomer, customers, onSetActiveCustomer, onSetCustomers };
};
