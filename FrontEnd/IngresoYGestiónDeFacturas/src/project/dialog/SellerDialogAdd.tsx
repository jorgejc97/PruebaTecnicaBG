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
import { Seller } from "../interface";
import { useSellerStore } from "../../shared";
import { useLazyGetSellersQuery, usePostSellerMutation } from "../../services";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const SellerDialogAdd = ({ open = false, onClose }: Props) => {
  const { onSetSellers } = useSellerStore();
  const { formState, onChange, isFormValid, errors } = useForm<Seller>(
    {
      id: null,
      identification: "",
      name: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      createdAt: null,
      active: null,
    },
    {
      identification: [
        (value) => value.length >= 10,
        "Ingrese una identificación válida",
      ],
      name: [(value) => value.length > 2, "Ingrese un nombre válido"],
      lastName: [(value) => value.length > 2, "Ingrese un apellido válido"],
      phone: [(value) => value.length >= 10, "Ingrese un teléfono válido"],
      email: [
        (value) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        "Ingrese un correo válido",
      ],
      address: [(value) => value.length > 2, "Ingrese una direccion válida"],
    }
  );
  const [fetchPostSeller, { isLoading }] = usePostSellerMutation();
  const [fetchGetSeller, { isLoading: isLoadingSellers }] =
    useLazyGetSellersQuery();

  const onPressSave = async () => {
    console.log(JSON.stringify(formState));
    return await fetchPostSeller(formState)
      .unwrap()
      .then(async () => await fetchGetSeller().unwrap().then(onSetSellers))
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
        throw error;
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Vendedor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="identificación"
          label="Identificación"
          type="text"
          fullWidth
          value={formState.identification}
          onChange={({ target: { value } }) => {
            const identificationRegex = /^\d{0,10}$/;
            identificationRegex.test(value) &&
              onChange("identification", value);
          }}
          error={!!errors.identification}
          helperText={errors.identification}
        />
        <TextField
          margin="dense"
          name="nombre"
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
          name="apellido"
          label="Apellido"
          type="text"
          fullWidth
          value={formState.lastName}
          onChange={({ target: { value } }) => onChange("lastName", value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          margin="dense"
          name="teléfono"
          label="Teléfono"
          type="text"
          fullWidth
          value={formState.phone}
          onChange={({ target: { value } }) => {
            const phoneRegex = /^\d{0,10}$/;
            phoneRegex.test(value) && onChange("phone", value);
          }}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="text"
          fullWidth
          value={formState.email}
          onChange={({ target: { value } }) => onChange("email", value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="dense"
          name="dirección"
          label="Dirección"
          type="text"
          fullWidth
          value={formState.address}
          onChange={({ target: { value } }) => onChange("address", value)}
          error={!!errors.address}
          helperText={errors.address}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="error"
          disabled={isLoading || isLoadingSellers}
        >
          Cancelar
        </Button>
        <Button
          onClick={async () => {
            await onPressSave()
              .then(() => {
                Swal.fire({
                  title: "Vendedor agregado",
                  text: "Vendedor agregado correctamente",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                });
              })
              .finally(() => onClose());
          }}
          disabled={!isFormValid() || isLoading || isLoadingSellers}
          color="primary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
