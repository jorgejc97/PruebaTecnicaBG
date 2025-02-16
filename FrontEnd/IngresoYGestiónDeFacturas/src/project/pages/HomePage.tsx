import { useEffect } from "react";
import {
  useLazyGetCustomersQuery,
  useLazyGetInvoicesQuery,
  useLazyGetProductsQuery,
  useLazyGetSellersQuery,
} from "../../services";
import {
  useCustomerStore,
  useInvoiceStore,
  useProductStore,
  useSellerStore,
} from "../../shared";
import { BasePage } from "../template";
import { Grid, Typography } from "@mui/material";

export const HomePage = () => {
  const [fetchGetInvoices] = useLazyGetInvoicesQuery();
  const [fetchGetSellers] = useLazyGetSellersQuery();
  const [fetchGetProducts] = useLazyGetProductsQuery();
  const [fetchGetCustomers] = useLazyGetCustomersQuery();
  const { onSetCustomers } = useCustomerStore();
  const { onSetInvoices } = useInvoiceStore();
  const { onSetProducts } = useProductStore();
  const { onSetSellers } = useSellerStore();

  useEffect(() => {
    Promise.all([
      fetchGetCustomers().unwrap().then(onSetCustomers),
      fetchGetSellers().unwrap().then(onSetSellers),
      fetchGetProducts().unwrap().then(onSetProducts),
      fetchGetInvoices().unwrap().then(onSetInvoices),
    ]);
  }, []);

  /*   useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]); */

  return (
    <BasePage>
      <Grid
        container
        direction="column"
        sx={{
          alignItems: "center",
          p: 3,
          overflowY: "auto",
        }}
      >
        <Grid
          container
          className="box-shadow animate__animated animate__fadeIn animate__faster"
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          xs={10}
          sx={{
            bgcolor: "#d6dbdf",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            border: "1px solid black",
          }}
        >
          <Grid item margin={1}>
            <Typography variant="h6">Inicio</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            xs={10}
            sx={{
              bgcolor: "white",
              p: 2,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              border: "1px solid black",
            }}
          ></Grid>
        </Grid>
      </Grid>
    </BasePage>
  );
};
