import { Delete, Download, PictureAsPdf } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useCustomerStore,
  useInvoiceStore,
  useSellerStore,
} from "../../shared";
import {
  useDeleteInvoiceMutation,
  useLazyGetInvoicesQuery,
} from "../../services";
import { BasePage } from "../template";
import { InvoiceDialogAdd } from "../dialog";
import { InvoicePdfGenerator } from "../components";
import { Invoice } from "../interface";

export const InvoicesPage = () => {
  const { customers } = useCustomerStore();
  const { sellers } = useSellerStore();
  const { invoices, onSetInvoices } = useInvoiceStore();
  const [isAddVisible, setisAddVisible] = useState(false);
  const [fetchGetInvoices, { isLoading }] = useLazyGetInvoicesQuery();
  const [fetchDeleteInvoice] = useDeleteInvoiceMutation();
  const [filter, setFilter] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [page, setPage] = useState(0);
  const { viewPDF, downloadPDF } = InvoicePdfGenerator();

  const onPressDeleteInvoice = async (invoice: Invoice) => {
    await fetchDeleteInvoice(invoice.id ?? "")
      .unwrap()
      .then(async () => {
        Swal.fire({
          title: "Eliminado",
          text: "Factura eliminada correctamente",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        await fetchGetInvoices().unwrap().then(onSetInvoices);
      })
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
      });
  };

  const handleFilterChange = (event: any) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    if (filterValue) {
      const filtered = invoices.filter(
        (invoice) =>
          invoice.number.toString().includes(filterValue) ||
          new Date(invoice.createdAt!)
            .toLocaleDateString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          invoice.total.toString().includes(filterValue)
      );
      setFilteredInvoices(filtered);
    } else {
      setFilteredInvoices(invoices);
    }
  };

  useEffect(() => {
    fetchGetInvoices().unwrap().then(onSetInvoices);
  }, []);

  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices]);

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
            <Typography variant="h6">Buscar Facturas</Typography>
          </Grid>

          <Grid item margin={1}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              onClick={() => setisAddVisible(true)}
            >
              Nueva Factura
            </Button>
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
          >
            <Grid container justifyContent={"center"}>
              <Grid item xs={5} margin={2}>
                <TextField
                  label="Buscar por Nombre cliente/Factura"
                  placeholder="Buscar por Nombre cliente/Factura"
                  fullWidth
                  size="small"
                  value={filter}
                  onChange={handleFilterChange}
                />
              </Grid>
            </Grid>
            {filteredInvoices.length === 0 ? (
              <Typography>{`${
                isLoading ? " Cargando..." : "No hay Facturas para mostrar"
              } `}</Typography>
            ) : (
              <Grid container alignContent={"center"} justifyContent={"center"}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          #
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Fecha
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Cliente
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Vendedor
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Estado
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Acciones
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredInvoices
                        .slice(page * 10, page * 10 + 10)
                        .map((invoice, index) => (
                          <TableRow key={index}>
                            <TableCell>{invoice.number}</TableCell>
                            <TableCell>
                              {new Date(
                                invoice.createdAt!
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {`${
                                customers.find(
                                  (customer) =>
                                    customer.id == invoice.customerId
                                )?.name || "cliente"
                              } ${
                                customers.find(
                                  (customer) =>
                                    customer.id == invoice.customerId
                                )?.lastName || ""
                              }`}
                            </TableCell>
                            <TableCell>
                              {`${
                                sellers.find(
                                  (seller) => seller.id == invoice.sellerId
                                )?.name || "vendedor"
                              } ${
                                sellers.find(
                                  (seller) => seller.id == invoice.sellerId
                                )?.lastName || ""
                              }`}
                            </TableCell>
                            <TableCell>{invoice.paymentStatus}</TableCell>
                            <TableCell>{`$${invoice.total}`}</TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <IconButton
                                  color="primary"
                                  aria-label="edit"
                                  sx={{
                                    borderRadius: "4px",
                                    "&:hover": {
                                      backgroundColor: "#1976d2",
                                      color: "white",
                                    },
                                  }}
                                  onClick={() => downloadPDF(invoice)}
                                >
                                  <Download />
                                </IconButton>
                                <IconButton
                                  color="primary"
                                  aria-label="edit"
                                  sx={{
                                    borderRadius: "4px",
                                    "&:hover": {
                                      backgroundColor: "#1976d2",
                                      color: "white",
                                    },
                                  }}
                                  onClick={() => {
                                    viewPDF(invoice);
                                  }}
                                >
                                  <PictureAsPdf />
                                </IconButton>
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
                                  onClick={() => {
                                    Swal.fire({
                                      title: "¿Estás seguro?",
                                      text: "¡No podrás revertir esta acción!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Sí, eliminar",
                                      cancelButtonText: "Cancelar",
                                      showLoaderOnConfirm: true,
                                    }).then(async (result) => {
                                      if (result.isConfirmed) {
                                        await onPressDeleteInvoice(invoice);
                                      }
                                    });
                                  }}
                                >
                                  <Delete />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Paginación */}
                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={Math.ceil(filteredInvoices.length / 10)}
                  rowsPerPage={1}
                  page={page}
                  onPageChange={(_, newPage) => setPage(newPage)}
                  labelDisplayedRows={({ from, count }) =>
                    `Página ${from} de ${count}`
                  }
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {/* Modales */}
        <InvoiceDialogAdd
          open={isAddVisible}
          onClose={() => setisAddVisible(false)}
          onSave={() => {}}
          onCancel={() => setisAddVisible(false)}
        />
      </Grid>
    </BasePage>
  );
};
