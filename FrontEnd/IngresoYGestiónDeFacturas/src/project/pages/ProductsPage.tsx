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
import { ProductDialogAdd, ProductDialogEdit } from "../dialog";
import Swal from "sweetalert2";
import { useProductStore } from "../../shared";
import {
  useDeleteProductMutation,
  useLazyGetProductsQuery,
} from "../../services";
import { Product } from "../interface";
import { BasePage } from "../template";

const users = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    code: "A001",
    name: "Producto 1",
    quantity: 10,
    unitPrice: 15.5,
    active: true,
    createdAt: "2025-02-15T10:00:00Z",
  },
  {
    id: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    code: "A002",
    name: "Producto 2",
    quantity: 20,
    unitPrice: 12.0,
    active: true,
    createdAt: "2025-02-15T11:00:00Z",
  },
  {
    id: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
    code: "A003",
    name: "Producto 3",
    quantity: 50,
    unitPrice: 7.8,
    active: true,
    createdAt: "2025-02-15T12:00:00Z",
  },
  {
    id: "6fa85f64-5717-4562-b3fc-2c963f66afa9",
    code: "A004",
    name: "Producto 4",
    quantity: 100,
    unitPrice: 3.0,
    active: true,
    createdAt: "2025-02-15T13:00:00Z",
  },
  {
    id: "7fa85f64-5717-4562-b3fc-2c963f66afaa",
    code: "A005",
    name: "Producto 5",
    quantity: 30,
    unitPrice: 10.5,
    active: true,
    createdAt: "2025-02-15T14:00:00Z",
  },
  {
    id: "8fa85f64-5717-4562-b3fc-2c963f66afab",
    code: "A006",
    name: "Producto 6",
    quantity: 15,
    unitPrice: 9.5,
    active: true,
    createdAt: "2025-02-15T15:00:00Z",
  },
  {
    id: "9fa85f64-5717-4562-b3fc-2c963f66afac",
    code: "A007",
    name: "Producto 7",
    quantity: 25,
    unitPrice: 11.2,
    active: true,
    createdAt: "2025-02-15T16:00:00Z",
  },
  {
    id: "afa85f64-5717-4562-b3fc-2c963f66afad",
    code: "A008",
    name: "Producto 8",
    quantity: 60,
    unitPrice: 5.6,
    active: true,
    createdAt: "2025-02-15T17:00:00Z",
  },
  {
    id: "bfa85f64-5717-4562-b3fc-2c963f66afae",
    code: "A009",
    name: "Producto 9",
    quantity: 80,
    unitPrice: 14.3,
    active: true,
    createdAt: "2025-02-15T18:00:00Z",
  },
  {
    id: "cfa85f64-5717-4562-b3fc-2c963f66afaf",
    code: "A010",
    name: "Producto 10",
    quantity: 120,
    unitPrice: 8.0,
    active: true,
    createdAt: "2025-02-15T19:00:00Z",
  },

  {
    id: "6fa85f64-5717-4562-b3fc-2c963f66afa9",
    code: "A004",
    name: "Producto 4",
    quantity: 100,
    unitPrice: 3.0,
    active: true,
    createdAt: "2025-02-15T19:00:00Z",
  },
  {
    id: "7fa85f64-5717-4562-b3fc-2c963f66afaa",
    code: "A005",
    name: "Producto 5",
    quantity: 30,
    unitPrice: 10.5,
    createdAt: "2025-02-15T19:00:00Z",
    active: true,
  },
  {
    id: "8fa85f64-5717-4562-b3fc-2c963f66afab",
    code: "A006",
    name: "Producto 6",
    quantity: 15,
    unitPrice: 9.5,
    active: true,
    createdAt: "2025-02-15T19:00:00Z",
  },
  {
    id: "9fa85f64-5717-4562-b3fc-2c963f66afac",
    code: "A007",
    name: "Producto 7",
    quantity: 25,
    unitPrice: 11.2,
    active: true,
    createdAt: "2025-02-15T19:00:00Z",
  },
  {
    id: "afa85f64-5717-4562-b3fc-2c963f66afad",
    code: "A008",
    name: "Producto 8",
    quantity: 60,
    unitPrice: 5.6,
    active: true,
    createdAt: "2025-02-15T19:00:00Z",
  },
  {
    id: "bfa85f64-5717-4562-b3fc-2c963f66afae",
    code: "A009",
    name: "Producto 9",
    quantity: 80,
    unitPrice: 14.3,
    active: true,
    createdAt: "2025-02-15T19:00:00Z",
  },
  {
    id: "cfa85f64-5717-4562-b3fc-2c963f66afaf",
    code: "A010",
    name: "Producto 10",
    quantity: 120,
    unitPrice: 8.0,
    active: true,
    createdAt: "2025-02-15T19:00:00Z",
  },
];

export const ProductsPage = () => {
  const [isEditVisible, setisEditVisible] = useState(false);
  const [isAddVisible, setisAddVisible] = useState(false);
  const { onSetActiveProduct, products, onSetProducts } = useProductStore();
  const [fetchGetProducts, { isLoading }] = useLazyGetProductsQuery();
  const [fetchDeleteProduct] = useDeleteProductMutation();
  const [filter, setFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(users);
  const [page, setPage] = useState(0);

  const onPressDeleteProduct = async (product: Product) => {
    await fetchDeleteProduct(product.id ?? "")
      .unwrap()
      .then(async () => {
        Swal.fire({
          title: "Eliminado",
          text: "Producto eliminado correctamente",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        await fetchGetProducts().unwrap().then(onSetProducts);
      })
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
      });
  };

  useEffect(() => {
    fetchGetProducts().unwrap().then(onSetProducts);
  }, []);

  const handleFilterChange = (event: any) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    if (filterValue) {
      const filtered = users.filter(
        (product) =>
          product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          product.code.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(users);
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
            <Typography variant="h6">Buscar Productos</Typography>
          </Grid>

          <Grid item margin={1}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              onClick={() => setisAddVisible(true)}
            >
              Nuevo Producto
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
                  label="Buscar por Producto/Codigo"
                  placeholder="Buscar por Producto/Codigo"
                  fullWidth
                  size="small"
                  value={filter}
                  onChange={handleFilterChange}
                />
              </Grid>
            </Grid>
            {filteredProducts.length === 0 ? (
              <Typography>{`${
                isLoading ? " Cargando..." : "No hay productos para mostrar"
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
                          Codigo
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          Producto
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          <div>Unidades</div>
                          <div>Disponibles</div>
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "skyblue",
                            fontWeight: "bold",
                          }}
                        >
                          <div>Precio</div>
                          <div>Unitario</div>
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
                      {filteredProducts
                        .slice(page * 10, page * 10 + 10)
                        .map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.code}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.unitPrice}</TableCell>
                            <TableCell>
                              {new Date(product.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {product.active ? "Activo" : "Inactivo"}
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
                                  onSetActiveProduct(product);
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
                                      await onPressDeleteProduct(product);
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
                  count={Math.ceil(filteredProducts.length / 10)}
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
        <ProductDialogAdd
          open={isAddVisible}
          onClose={() => setisAddVisible(false)}
          onSave={() => {}}
          onCancel={() => setisAddVisible(false)}
        />
        <ProductDialogEdit
          open={isEditVisible}
          onClose={() => setisEditVisible(false)}
        />
      </Grid>
    </BasePage>
  );
};
