import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "..";

export const useAppStore = () => {
  //*Auth
  const auth = useSelector((store: RootState) => store.auth);
  const seller = useSelector((store: RootState) => store.seller);
  const customer = useSelector((store: RootState) => store.customer);
  const product = useSelector((store: RootState) => store.product);
  const invoice = useSelector((store: RootState) => store.invoice);

  const dispatch = useDispatch<AppDispatch>();
  return { auth, seller, customer, product, invoice, dispatch };
};
