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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { useEffect } from "react";
import { Seller } from "../interface";
import { useLazyGetSellersQuery, usePutSellerMutation } from "../../services";
import { useSellerStore } from "../../shared";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SellerDialogEdit = ({ open = false, onClose }: Props) => {
  const { activeSeller, onSetSellers } = useSellerStore();

  const { formState, onChange, isFormValid, errors, setFormState } =
    useForm<Seller>(
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

  const [fetchPutSeller, { isLoading }] = usePutSellerMutation();
  const [fetchGetSellers, { isLoading: isLoadingSellers }] =
    useLazyGetSellersQuery();

  const onPressSave = async () => {
    return await fetchPutSeller(formState)
      .unwrap()
      .then(async () => await fetchGetSellers().unwrap().then(onSetSellers))
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
        throw error;
      });
  };

  useEffect(() => {
    setFormState(activeSeller);
  }, [activeSeller, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Vendedor</DialogTitle>
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
          disabled={isLoading || isLoadingSellers}
        >
          Cancelar
        </Button>
        <Button
          onClick={async () => {
            await onPressSave()
              .then(() => {
                Swal.fire({
                  title: "Vendedor actualizado",
                  text: "Vendedor actualizado correctamente",
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
      <Backdrop open={isLoading} sx={{ zIndex: 1000, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};
