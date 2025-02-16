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
} from "@mui/material";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { useEffect } from "react";
import { Invoice } from "../interface";
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
import { Delete } from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const InvoiceDialogAdd = ({ open = false, onClose }: Props) => {
  const {
    jwtInfo: { userInfo },
  } = useAuthStore();
  const { customers } = useCustomerStore();
  const { products, onSetProducts } = useProductStore();
  const { sellers } = useSellerStore();
  const { onSetInvoices } = useInvoiceStore();
  const { formState, onChange, isFormValid, errors, resetForm } =
    useForm<Invoice>(
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
        invoiceDetail: [],
      },
      {
        companyId: [
          (value) => value.length >= 10,
          "Ingrese una identificación válida",
        ],
        customerId: [(value) => value.length > 2, "Ingrese un nombre válido"],
        sellerId: [(value) => value.length > 2, "Ingrese un apellido válido"],
        paymentMethod: [
          (value) => value.length >= 10,
          "Ingrese un teléfono válido",
        ],
        paymentStatus: [
          (value) => value.length >= 2,
          "Ingrese un correo válido",
        ],
      }
    );
  const [fetchPostInvoice, { isLoading }] = usePostInvoiceMutation();
  const [fetchGetInvoice, { isLoading: isLoadingInvoices }] =
    useLazyGetInvoicesQuery();

  const onPressSave = async () => {
    console.log(JSON.stringify(formState));
    return await fetchPostInvoice(formState)
      .unwrap()
      .then(async () => await fetchGetInvoice().unwrap().then(onSetInvoices))
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
        throw error;
      });
  };

  useEffect(() => {
    !open && resetForm();
  }, [open]);

  useEffect(() => {
    console.log(JSON.stringify(formState));
  }, [formState]);

  return (
    <Dialog fullWidth={true} maxWidth={"xl"} open={open} onClose={onClose}>
      <DialogTitle>Agregar Factura</DialogTitle>
      <DialogContent>
        <Grid
          container
          rowSpacing={2}
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
                      backgroundColor: "skyblue",
                      fontWeight: "bold",
                    }}
                  >
                    Total
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "skyblue",
                      fontWeight: "bold",
                      display:
                        formState.invoiceDetail.length > 0
                          ? "table-cell"
                          : "none",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formState.invoiceDetail.map((detail, index) => (
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
                    <TableCell align="right">
                      {products.find(
                        (product) => product.id === detail.productId
                      )?.unitPrice || 0}
                    </TableCell>
                    <TableCell align="right">
                      {products.find(
                        (product) => product.id === detail.productId
                      )?.unitPrice! * detail.quantity || 0}
                    </TableCell>

                    <TableCell
                      sx={{
                        display:
                          formState.invoiceDetail.length > 1
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
                        onClick={undefined}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={formState.invoiceDetail.length > 0 ? 5 : 4}
                  ></TableCell>
                  <TableCell align="right">Subtotal $</TableCell>
                  <TableCell align="right">{0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={formState.invoiceDetail.length > 0 ? 5 : 4}
                  ></TableCell>
                  <TableCell align="right">{`IVA (${
                    userInfo.iva
                  })% ${"$"}`}</TableCell>
                  <TableCell align="right">{0.0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={formState.invoiceDetail.length > 0 ? 5 : 4}
                  ></TableCell>
                  <TableCell align="right">Total $</TableCell>
                  <TableCell align="right">{0.0}</TableCell>
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
                  title: "Cliente actualizado",
                  text: "Cliente actualizado correctamente",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                });
              })
              .finally(() => onClose());
          }}
          disabled={!isFormValid() || isLoading || isLoadingInvoices}
          color="primary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
