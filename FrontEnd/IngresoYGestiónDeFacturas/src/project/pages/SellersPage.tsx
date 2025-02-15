import { Delete, Edit } from "@mui/icons-material";
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
import { useEffect, useState } from "react";
import { SellerDialogAdd, SellerDialogEdit } from "../dialog";
import Swal from "sweetalert2";
import { useSellerStore } from "../../shared";
import {
  useDeleteSellerMutation,
  useLazyGetSellersQuery,
} from "../../services";
import { Seller } from "../interface";
import { BasePage } from "../template";

const users = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
    identification: "1234567890",
    name: "Juan",
    lastName: "Pérez",
    phone: "1234567890",
    email: "juan@example.com",
    address: "Calle 123",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa2",
    identification: "0987654321",
    name: "María",
    lastName: "López",
    phone: "0987654321",
    email: "maria@example.com",
    address: "Avenida 456",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
    identification: "1122334455",
    name: "Carlos",
    lastName: "Gómez",
    phone: "1122334455",
    email: "carlos@example.com",
    address: "Carrera 789",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
    identification: "2233445566",
    name: "Ana",
    lastName: "Martínez",
    phone: "2233445566",
    email: "ana@example.com",
    address: "Diagonal 987",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
    identification: "3344556677",
    name: "Luis",
    lastName: "Hernández",
    phone: "3344556677",
    email: "luis@example.com",
    address: "Calle 741",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    identification: "4455667788",
    name: "Elena",
    lastName: "García",
    phone: "4455667788",
    email: "elena@example.com",
    address: "Avenida 159",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    identification: "5566778899",
    name: "Pedro",
    lastName: "Ramírez",
    phone: "5566778899",
    email: "pedro@example.com",
    address: "Carrera 357",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
    identification: "6677889900",
    name: "Sofía",
    lastName: "Díaz",
    phone: "6677889900",
    email: "sofia@example.com",
    address: "Diagonal 258",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
    identification: "7788990011",
    name: "Daniel",
    lastName: "Torres",
    phone: "7788990011",
    email: "daniel@example.com",
    address: "Calle 654",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afaa",
    identification: "8899001122",
    name: "Laura",
    lastName: "Fernández",
    phone: "8899001122",
    email: "laura@example.com",
    address: "Avenida 357",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb1",
    identification: "9900112233",
    name: "Miguel",
    lastName: "Ortiz",
    phone: "9900112233",
    email: "miguel@example.com",
    address: "Calle 852",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb2",
    identification: "1100223344",
    name: "Gabriela",
    lastName: "Rojas",
    phone: "1100223344",
    email: "gabriela@example.com",
    address: "Avenida 741",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb3",
    identification: "2200334455",
    name: "Fernando",
    lastName: "Castro",
    phone: "2200334455",
    email: "fernando@example.com",
    address: "Carrera 123",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb4",
    identification: "3300445566",
    name: "Patricia",
    lastName: "Suárez",
    phone: "3300445566",
    email: "patricia@example.com",
    address: "Diagonal 654",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb5",
    identification: "4400556677",
    name: "Ricardo",
    lastName: "Paredes",
    phone: "4400556677",
    email: "ricardo@example.com",
    address: "Calle 369",
    createdAt: "2025-02-15T01:59:44.999Z",
    active: true,
  },
];
export const SellersPage = () => {
  const [isEditVisible, setisEditVisible] = useState(false);
  const [isAddVisible, setisAddVisible] = useState(false);
  const { onSetActiveSeller, sellers, onSetSellers } = useSellerStore();
  const [fetchGetSellers, { isLoading }] = useLazyGetSellersQuery();
  const [fetchDeleteSeller] = useDeleteSellerMutation();
  const [filter, setFilter] = useState("");
  const [filteredSellers, setFilteredSellers] = useState(users);
  const [page, setPage] = useState(0);

  const onPressDeleteSeller = async (seller: Seller) => {
    await fetchDeleteSeller(seller.id ?? "")
      .unwrap()
      .then(async () => {
        Swal.fire({
          title: "Eliminado",
          text: "Vendedor eliminado correctamente",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        await fetchGetSellers().unwrap().then(onSetSellers);
      })
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
      });
  };

  useEffect(() => {
    fetchGetSellers().unwrap().then(onSetSellers);
  }, []);

  const handleFilterChange = (event: any) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    if (filterValue) {
      const filtered = users.filter(
        (seller) =>
          seller.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          seller.identification.includes(filterValue)
      );
      setFilteredSellers(filtered);
    } else {
      setFilteredSellers(users);
    }
  };

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
            <Typography variant="h6">Buscar Vendedores</Typography>
          </Grid>

          <Grid item margin={1}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              onClick={() => setisAddVisible(true)}
            >
              Nuevo Vendedor
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
            {filteredSellers.length === 0 ? (
              <Typography>{`${
                isLoading ? " Cargando..." : "No hay vendedores para mostrar"
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
                      {filteredSellers
                        .slice(page * 10, page * 10 + 10)
                        .map((seller) => (
                          <TableRow key={seller.id}>
                            <TableCell>{seller.identification}</TableCell>
                            <TableCell>{`${seller.name} ${seller.lastName}`}</TableCell>
                            <TableCell>{seller.email}</TableCell>
                            <TableCell>{seller.phone}</TableCell>
                            <TableCell>{seller.address}</TableCell>
                            <TableCell>
                              {new Date(seller.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {seller.active ? "Activo" : "Inactivo"}
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
                                  onSetActiveSeller(seller);
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
                                      await onPressDeleteSeller(seller);
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
                  count={Math.ceil(filteredSellers.length / 10)}
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
        <SellerDialogAdd
          open={isAddVisible}
          onClose={() => setisAddVisible(false)}
          onSave={() => {}}
          onCancel={() => setisAddVisible(false)}
        />
        <SellerDialogEdit
          open={isEditVisible}
          onClose={() => setisEditVisible(false)}
        />
      </Grid>
    </BasePage>
  );
};
