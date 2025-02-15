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

export const ProductsPage = () => {
  const [isEditVisible, setisEditVisible] = useState(false);
  const [isAddVisible, setisAddVisible] = useState(false);
  const { onSetActiveProduct, products, onSetProducts } = useProductStore();
  const [fetchGetProducts, { isLoading }] = useLazyGetProductsQuery();
  const [fetchDeleteProduct] = useDeleteProductMutation();
  const [filter, setFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
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
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          product.code.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
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
                              {new Date(
                                product.createdAt!
                              ).toLocaleDateString()}
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
