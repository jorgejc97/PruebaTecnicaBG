import { useEffect, useState } from "react";
import { useCustomerStore } from "../../shared";
import {
  useDeleteCustomerMutation,
  useLazyGetCustomersQuery,
} from "../../services";
import { Customer } from "../interface";
import Swal from "sweetalert2";
import { BasePage } from "../template";
import {
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
import { Delete, Edit } from "@mui/icons-material";
import { CustomerDialogAdd, CustomerDialogEdit } from "../dialog";

export const CustomersPage = () => {
  const [isEditVisible, setisEditVisible] = useState(false);
  const [isAddVisible, setisAddVisible] = useState(false);
  const { onSetActiveCustomer, customers, onSetCustomers } = useCustomerStore();
  const [fetchGetCustomers, { isLoading }] = useLazyGetCustomersQuery();
  const [fetchDeleteCustomer] = useDeleteCustomerMutation();
  const [filter, setFilter] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [page, setPage] = useState(0);

  const onPressDeleteCustomer = async (customer: Customer) => {
    await fetchDeleteCustomer(customer.id ?? "")
      .unwrap()
      .then(async () => {
        Swal.fire({
          title: "Eliminado",
          text: "Cliente eliminado correctamente",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        await fetchGetCustomers().unwrap().then(onSetCustomers);
      })
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
      });
  };

  const handleFilterChange = (event: any) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    if (filterValue) {
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          customer.identification.includes(filterValue)
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  };

  useEffect(() => {
    fetchGetCustomers().unwrap().then(onSetCustomers);
  }, []);

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

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
            <Typography variant="h6">Buscar Clientes</Typography>
          </Grid>

          <Grid item margin={1}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              onClick={() => setisAddVisible(true)}
            >
              Nuevo Cliente
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
                  label="Buscar por Nombre/Identificación"
                  placeholder="Buscar por Nombre/Identificaión"
                  fullWidth
                  size="small"
                  value={filter}
                  onChange={handleFilterChange}
                />
              </Grid>
            </Grid>
            {filteredCustomers.length === 0 ? (
              <Typography>{`${
                isLoading ? " Cargando..." : "No hay clientes para mostrar"
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
                          Identificación
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Nombres
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Teléfono
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Dirección
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Agregado
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Activo
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
                      {filteredCustomers
                        .slice(page * 10, page * 10 + 10)
                        .map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>{customer.identification}</TableCell>
                            <TableCell>{`${customer.name} ${customer.lastName}`}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{customer.address}</TableCell>
                            <TableCell>
                              {new Date(
                                customer.createdAt!
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {customer.active ? "Activo" : "Inactivo"}
                            </TableCell>
                            <TableCell>
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
                                  onSetActiveCustomer(customer);
                                  setisEditVisible(true);
                                }}
                              >
                                <Edit />
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
                                      await onPressDeleteCustomer(customer);
                                    }
                                  });
                                }}
                              >
                                <Delete />
                              </IconButton>
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
                  count={Math.ceil(filteredCustomers.length / 10)}
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
        <CustomerDialogAdd
          open={isAddVisible}
          onClose={() => setisAddVisible(false)}
          onSave={() => {}}
          onCancel={() => setisAddVisible(false)}
        />
        <CustomerDialogEdit
          open={isEditVisible}
          onClose={() => setisEditVisible(false)}
        />
      </Grid>
    </BasePage>
  );
};
