import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Product } from "../interface";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { useProductStore } from "../../shared";
import { useEffect } from "react";
import { useLazyGetProductsQuery, usePutProductMutation } from "../../services";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ProductDialogEdit = ({ open = false, onClose }: Props) => {
  const { activeProduct, onSetProducts } = useProductStore();

  const { formState, onChange, isFormValid, errors, setFormState } =
    useForm<Product>(
      {
        id: null,
        code: "",
        name: "",
        quantity: 0,
        unitPrice: 0.0,
        createdAt: null,
        active: null,
      },
      {
        code: [(value) => value.length > 2, "Ingrese un nombre válido"],
        name: [(value) => value.length > 2, "Ingrese un nombre válido"],
        quantity: [(value) => value > 0, "Ingrese un correo válido"],
        unitPrice: [(value) => value > 0, "Ingrese un correo válido"],
      }
    );

  const [fetchPutProduct, { isLoading }] = usePutProductMutation();
  const [fetchGetProducts, { isLoading: isLoadingProducts }] =
    useLazyGetProductsQuery();

  const onPressSave = async () => {
    return await fetchPutProduct(formState)
      .unwrap()
      .then(async () => await fetchGetProducts().unwrap().then(onSetProducts))
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
        throw error;
      });
  };

  useEffect(() => {
    setFormState(activeProduct);
  }, [activeProduct, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="codigo"
          label="Código"
          type="text"
          fullWidth
          value={formState.code}
          onChange={({ target: { value } }) => onChange("code", value)}
          error={!!errors.code}
          helperText={errors.code}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          value={formState.name}
          onChange={({ target: { value } }) => onChange("name", value)}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          margin="dense"
          name="cantidad"
          label="Cantidad"
          type="number"
          fullWidth
          value={formState.quantity}
          onChange={({ target: { value } }) =>
            onChange("quantity", Number(value))
          }
          error={!!errors.quantity}
          helperText={errors.quantity}
        />
        <TextField
          margin="dense"
          name="Precio"
          label="Precio"
          type="number"
          fullWidth
          value={formState.unitPrice}
          onChange={({ target: { value } }) =>
            onChange("unitPrice", Number(value))
          }
          error={!!errors.unitPrice}
          helperText={errors.unitPrice}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Estado</InputLabel>
          <Select
            value={formState.active ?? false}
            label="Estado"
            onChange={({ target: { value } }) =>
              onChange("active", value === "true")
            }
          >
            <MenuItem value={"true"}>Activo</MenuItem>
            <MenuItem value={"false"}>Inactivo</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="error"
          disabled={isLoading || isLoadingProducts}
        >
          Cancelar
        </Button>
        <Button
          onClick={async () => {
            await onPressSave()
              .then(() => {
                Swal.fire({
                  title: "Producto actualizado",
                  text: "Producto actualizado correctamente",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                });
              })
              .finally(() => onClose());
          }}
          disabled={!isFormValid() || isLoading || isLoadingProducts}
          color="primary"
        >
          Guardar
        </Button>
      </DialogActions>
      <Backdrop open={isLoading} sx={{ zIndex: 1000, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};
