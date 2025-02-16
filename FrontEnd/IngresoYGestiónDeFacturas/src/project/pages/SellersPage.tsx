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
import { useProductStore, useSellerStore } from "../../shared";
import {
  useDeleteSellerMutation,
  useLazyGetSellersQuery,
} from "../../services";
import { Seller } from "../interface";
import { BasePage } from "../template";

export const SellersPage = () => {
  const [fetchGetSellers, { isLoading }] = useLazyGetSellersQuery();

  useProductStore();
  const [isEditVisible, setisEditVisible] = useState(false);
  const [isAddVisible, setisAddVisible] = useState(false);
  const { onSetActiveSeller, sellers, onSetSellers } = useSellerStore();
  const [fetchDeleteSeller] = useDeleteSellerMutation();
  const [filter, setFilter] = useState("");
  const [filteredSellers, setFilteredSellers] = useState(sellers);
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

  const handleFilterChange = (event: any) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    if (filterValue) {
      const filtered = sellers.filter(
        (seller) =>
          seller.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          seller.identification.includes(filterValue)
      );
      setFilteredSellers(filtered);
    } else {
      setFilteredSellers(sellers);
    }
  };

  useEffect(() => {
    fetchGetSellers().unwrap().then(onSetSellers);
  }, []);

  useEffect(() => {
    setFilteredSellers(sellers);
  }, [sellers]);

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
                              {new Date(seller.createdAt!).toLocaleDateString()}
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
