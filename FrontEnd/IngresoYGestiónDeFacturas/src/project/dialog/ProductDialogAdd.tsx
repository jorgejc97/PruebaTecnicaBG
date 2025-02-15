import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { Product } from "../interface";
import {
  useLazyGetProductsQuery,
  usePostProductMutation,
} from "../../services";
import { useProductStore } from "../../shared";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProductDialogAdd = ({ open = false, onClose }: Props) => {
  const { onSetProducts } = useProductStore();
  const { formState, onChange, isFormValid, errors, resetForm } =
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
        code: [(value) => value.length > 2, "Ingrese un codigo válido"],
        name: [(value) => value.length > 2, "Ingrese un producto válido"],
        quantity: [(value) => value > 0, "Ingrese un minimo 1 producto"],
        unitPrice: [(value) => value > 0, "Ingrese un precio valido"],
      }
    );
  const [fetchPostProduct, { isLoading }] = usePostProductMutation();
  const [fetchGetProducts, { isLoading: isLoadingProducts }] =
    useLazyGetProductsQuery();

  const onPressSave = async () => {
    console.log(JSON.stringify(formState));
    return await fetchPostProduct(formState)
      .unwrap()
      .then(async () => await fetchGetProducts().unwrap().then(onSetProducts))
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
        throw error;
      });
  };

  useEffect(() => {
    !open && resetForm();
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Producto</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Codigo"
          type="text"
          fullWidth
          value={formState.code}
          onChange={({ target: { value } }) => onChange("code", value)}
          error={!!errors.code}
          helperText={errors.code}
        />
        <TextField
          margin="dense"
          name="Producto"
          label="Producto"
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
          type="text"
          fullWidth
          value={formState.quantity === 0 ? "0" : formState.quantity}
          onChange={({ target: { value } }) => {
            const regex = /^\d{0,3}$/;
            regex.test(value) && onChange("quantity", Number(value));
          }}
          error={!!errors.quantity}
          helperText={errors.quantity}
        />
        <TextField
          margin="dense"
          name="Precio Unitario"
          label="Precio Unitario"
          type="text"
          fullWidth
          value={formState.unitPrice === 0 ? "0" : formState.unitPrice}
          onChange={({ target: { value } }) => {
            const regex = /^\d{0,3}$/;
            regex.test(value) && onChange("unitPrice", Number(value));
          }}
          error={!!errors.unitPrice}
          helperText={errors.unitPrice}
        />
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
                  title: "Producto agregado",
                  text: "Producto agregado correctamente",
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
    </Dialog>
  );
};
