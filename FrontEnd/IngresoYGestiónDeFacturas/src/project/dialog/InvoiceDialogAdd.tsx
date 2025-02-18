import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
  Autocomplete,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { useEffect, useState } from "react";
import { Invoice, InvoiceDetail } from "../interface";
import {
  useLazyGetInvoicesQuery,
  usePostInvoiceMutation,
} from "../../services";
import {
  useAuthStore,
  useCustomerStore,
  useInvoiceStore,
  useProductStore,
  useSellerStore,
} from "../../shared";
import { AddShoppingCart, Delete } from "@mui/icons-material";
import { InvoicePdfGenerator } from "../components";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const InvoiceDialogAdd = ({ open = false, onClose }: Props) => {
  const [fetchPostInvoice, { isLoading }] = usePostInvoiceMutation();
  const [fetchGetInvoice, { isLoading: isLoadingInvoices }] =
    useLazyGetInvoicesQuery();
  const {
    jwtInfo: { userInfo },
  } = useAuthStore();
  const { customers } = useCustomerStore();
  const { products } = useProductStore();
  const { sellers } = useSellerStore();
  const { onSetInvoices } = useInvoiceStore();
  const { viewPDF } = InvoicePdfGenerator();

  const [invoiceDetail, setInvoiceDetail] = useState<InvoiceDetail>({
    id: null,
    invoiceId: null,
    productId: "",
    quantity: 0,
    unitPrice: 0,
    total: 0,
  });

  const ChangeInvoiceDetail = (field: string, value: string | number) => {
    setInvoiceDetail((prev) => {
      const updatedDetail = {
        ...prev,
        [field]: value,
      };

      if (field === "quantity" || field === "unitPrice") {
        const total =
          Number(updatedDetail.quantity) * Number(updatedDetail.unitPrice);
        return {
          ...updatedDetail,
          total: Math.ceil(total * 100) / 100,
        };
      }

      return updatedDetail;
    });
  };

  const saveInvoiceDetail = () => {
    const prev = [...formState.invoiceDetails, invoiceDetail];

    setInvoiceDetail({
      id: null,
      invoiceId: null,
      productId: "",
      quantity: 0,
      unitPrice: 0,
      total: 0,
    });

    const newSubtotal = prev.reduce((acc, item) => acc + Number(item.total), 0);
    const roundedSubtotal = Math.ceil(newSubtotal * 100) / 100;
    const newIva =
      Math.ceil(roundedSubtotal * (userInfo.iva / 100) * 100) / 100;
    const newTotal = Math.ceil((roundedSubtotal + newIva) * 100) / 100;

    onChange("subTotal", roundedSubtotal);
    onChange("iva", newIva);
    onChange("total", newTotal);
    onChange("invoiceDetails", prev);
  };

  const deleteInvoiceDetail = (index: number) => {
    const updatedInvoiceDetails = formState.invoiceDetails.filter(
      (_, idx) => idx !== index
    );

    const newSubtotal = updatedInvoiceDetails.reduce(
      (acc, item) => acc + Number(item.total),
      0
    );
    const roundedSubtotal = Math.ceil(newSubtotal * 100) / 100;

    const newIva =
      Math.ceil(roundedSubtotal * (userInfo.iva / 100) * 100) / 100;
    const newTotal = Math.ceil((roundedSubtotal + newIva) * 100) / 100;

    onChange("subTotal", roundedSubtotal);
    onChange("iva", newIva);
    onChange("total", newTotal);
    onChange("invoiceDetails", updatedInvoiceDetails);
  };

  const { formState, onChange, isFormValid, resetForm } = useForm<Invoice>(
    {
      id: null,
      number: Math.floor(Math.random() * 10000),
      companyId: userInfo.id,
      customerId: "",
      sellerId: "",
      paymentMethod: "",
      paymentStatus: "",
      subTotal: 0,
      iva: 0,
      total: 0,
      createdAt: null,
      invoiceDetails: [],
    },
    {
      customerId: [(value) => value != "", "Seleccione un Cliente"],
      sellerId: [(value) => value != "", "Seleccione un Vendedor"],
      paymentMethod: [(value) => value != "", "Metodo Pago Requerido"],
      paymentStatus: [(value) => value != "", "Status Pago Requerido"],
    }
  );

  const onPressSave = async () => {
    return await fetchPostInvoice(formState)
      .unwrap()
      .then(async () => {
        await fetchGetInvoice().unwrap().then(onSetInvoices);
        viewPDF(formState);
      })
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
        throw error;
      });
  };

  useEffect(() => {
    !open && resetForm();
  }, [open]);

  useEffect(() => {}, [formState]);

  return (
    <Dialog fullWidth={true} maxWidth={"xl"} open={open} onClose={onClose}>
      <DialogTitle>Agregar Factura</DialogTitle>
      <DialogContent>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={2.5}>
            <Autocomplete
              disablePortal
              options={customers}
              getOptionLabel={(customer) =>
                `${customer.name} ${customer.lastName}`
              }
              onChange={(_, newValue) =>
                onChange("customerId", newValue ? newValue.id! : "")
              }
              renderInput={(params) => (
                <TextField {...params} label="Cliente" />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              autoFocus
              disabled={true}
              margin="dense"
              name="identificación"
              label="Identificación"
              type="text"
              fullWidth
              value={
                customers.find(
                  (customer) => customer.id === formState.customerId
                )?.identification || ""
              }
              onChange={({ target: { value } }) =>
                onChange("customerId", value)
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              autoFocus
              disabled={true}
              margin="dense"
              name="Teléfono"
              label="Teléfono"
              type="text"
              fullWidth
              value={
                customers.find(
                  (customer) => customer.id === formState.customerId
                )?.phone || ""
              }
              onChange={({ target: { value } }) =>
                onChange("customerId", value)
              }
            />
          </Grid>
          <Grid item xs={2.6}>
            <TextField
              autoFocus
              disabled={true}
              margin="dense"
              name="Coreeo"
              label="Correo"
              type="text"
              fullWidth
              value={
                customers.find(
                  (customer) => customer.id === formState.customerId
                )?.email || ""
              }
              onChange={({ target: { value } }) =>
                onChange("customerId", value)
              }
            />
          </Grid>
          <Grid item xs={2.9}>
            <TextField
              autoFocus
              disabled={true}
              margin="dense"
              name="Dreccion"
              label="Direccion"
              type="text"
              fullWidth
              value={
                customers.find(
                  (customer) => customer.id === formState.customerId
                )?.address || ""
              }
              onChange={({ target: { value } }) =>
                onChange("customerId", value)
              }
            />
          </Grid>

          <Grid item xs={4}>
            <Autocomplete
              options={sellers}
              getOptionLabel={(seller) => `${seller.name} ${seller.lastName}`}
              onChange={(_, newValue) =>
                onChange("sellerId", newValue ? newValue.id! : "")
              }
              renderInput={(params) => (
                <TextField {...params} label="Vendedor" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              disabled={true}
              margin="dense"
              name="Fecha"
              label="Fecha"
              type="text"
              fullWidth
              value={new Date().toLocaleDateString()}
            />
          </Grid>

          <Grid
            container
            item
            xs={4}
            spacing={2}
            direction={"row"}
            alignItems={"center"}
          >
            <Grid item xs={7}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Metodo de Pago</InputLabel>
                <Select
                  value={formState.paymentMethod}
                  label="Metodo de Pago"
                  onChange={({ target: { value } }) =>
                    onChange("paymentMethod", value)
                  }
                >
                  <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                  <MenuItem value={"Tarjeta de Crédito"}>
                    Tarjeta de Crédito
                  </MenuItem>
                  <MenuItem value={"Transferencia Bancaria"}>
                    Transferencia Bancaria
                  </MenuItem>
                  <MenuItem value={"Cheque"}>Cheque</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Estado</InputLabel>
                <Select
                  value={formState.paymentStatus}
                  label="Estado"
                  onChange={({ target: { value } }) =>
                    onChange("paymentStatus", value)
                  }
                >
                  <MenuItem value={"Pagado"}>Pagado</MenuItem>
                  <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
                  <MenuItem value={"Anulado"}>Anulado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              options={products}
              getOptionLabel={(product) => product.name}
              onChange={(_, newValue) => {
                ChangeInvoiceDetail("productId", newValue ? newValue.id! : "");
                ChangeInvoiceDetail(
                  "unitPrice",
                  newValue ? newValue.unitPrice : 0
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Producto" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              disabled={invoiceDetail.productId!.length > 4 ? false : true}
              autoFocus
              margin="dense"
              name="Cantidad"
              label="Cantidad"
              type="text"
              fullWidth
              value={
                invoiceDetail.quantity === 0 ? "0" : invoiceDetail.quantity
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const regex = /^\d{0,4}$/;
                regex.test(e.target.value) &&
                  ChangeInvoiceDetail("quantity", Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={
                invoiceDetail.productId != "" && invoiceDetail.quantity != 0
                  ? false
                  : true
              }
              variant="contained"
              fullWidth
              type="submit"
              onClick={saveInvoiceDetail}
            >
              <AddShoppingCart />
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          marginTop={4}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "skyblue",
                      fontWeight: "bold",
                    }}
                  >
                    Codigo
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "skyblue",
                      fontWeight: "bold",
                    }}
                  >
                    Cantidad
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "skyblue",
                      fontWeight: "bold",
                    }}
                  >
                    Descripcion
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "skyblue",
                      fontWeight: "bold",
                    }}
                  >
                    Precio Unitario
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "skyblue",
                      fontWeight: "bold",
                    }}
                  >
                    Precio Total
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      width: "4%",
                      backgroundColor: "skyblue",
                      fontWeight: "bold",
                    }}
                  >
                    {""}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formState.invoiceDetails.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell align="right">
                      {products.find(
                        (product) => product.id === detail.productId
                      )?.code || ""}
                    </TableCell>
                    <TableCell align="right">{detail.quantity}</TableCell>
                    <TableCell align="right">
                      {products.find(
                        (product) => product.id === detail.productId
                      )?.name || ""}
                    </TableCell>
                    <TableCell align="right">{detail.unitPrice}</TableCell>
                    <TableCell align="right">{detail.total}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        display:
                          formState.invoiceDetails.length >= 1
                            ? "table-cell"
                            : "none",
                      }}
                    >
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        sx={{
                          borderRadius: "4px",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                            color: "white",
                          },
                        }}
                        onClick={() => deleteInvoiceDetail(index)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={formState.invoiceDetails.length > 0 ? 4 : 3}
                  ></TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Subtotal $
                  </TableCell>
                  <TableCell align="right">{formState.subTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={formState.invoiceDetails.length > 0 ? 4 : 3}
                  ></TableCell>
                  <TableCell
                    style={{ fontWeight: "bold" }}
                    align="right"
                  >{`IVA (${userInfo.iva})% ${"$"}`}</TableCell>
                  <TableCell align="right">{formState.iva}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={formState.invoiceDetails.length > 0 ? 4 : 3}
                  ></TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Total $
                  </TableCell>
                  <TableCell align="right">{formState.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="error"
          disabled={isLoading || isLoadingInvoices}
        >
          Cancelar
        </Button>
        <Button
          onClick={async () => {
            await onPressSave()
              .then(() => {
                Swal.fire({
                  title: "Factura Creada",
                  text: "Factura Creada",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                });
              })
              .finally(() => onClose());
          }}
          disabled={!isFormValid() || isLoading || isLoadingInvoices}
          color="primary"
        >
          Generar Factura
        </Button>
      </DialogActions>
      <Backdrop open={isLoading} sx={{ zIndex: 1000, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};
