import { Seller } from "../../project";
import { setActiveSeller, setSellers } from "../sellers";
import { useAppStore } from "./useAppStore";

export const useSellerStore = () => {
  const {
    seller: { activeSeller, sellers },
    dispatch,
  } = useAppStore();

  const onSetActiveSeller = (seller: Seller) => {
    dispatch(setActiveSeller(seller));
  };

  const onSetSellers = (sellers: Seller[]) => {
    dispatch(setSellers(sellers));
  };

  return { activeSeller, sellers, onSetActiveSeller, onSetSellers };
};
