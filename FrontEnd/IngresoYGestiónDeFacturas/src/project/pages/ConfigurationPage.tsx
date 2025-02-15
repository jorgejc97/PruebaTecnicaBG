import { Button, Grid, TextField, Typography } from "@mui/material";
import { useAuthStore } from "../../shared";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { usePutUserMutation } from "../../services";
import { JWTInfo, UserInfo } from "../../auth";
import { BasePage } from "../template";

export const ConfigurationPage = () => {
  const {
    jwtInfo: { userInfo },
    jwtInfo,
  } = useAuthStore();
  const { onLogin } = useAuthStore();
  const [fetchPutUser, { isLoading }] = usePutUserMutation();

  const { formState, onChange, isFormValid, errors } = useForm<UserInfo>(
    {
      id: userInfo.id,
      nameCompany: userInfo.nameCompany,
      phoneNumber: userInfo.phoneNumber,
      email: userInfo.email,
      iva: userInfo.iva,
      address: userInfo.address,
      city: userInfo.city,
      regionProvince: userInfo.regionProvince,
      zipcode: userInfo.zipcode,
    },
    {
      email: [
        (value) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        "Ingrese un correo válido",
      ],
      nameCompany: [
        (value) => value.length >= 2,
        "El campo debe tener más de 2 letras.",
      ],
      phoneNumber: [
        (value) => value.length >= 13,
        "Ingrese un Teléfono válido.",
      ],
      zipcode: [
        (value) => /^\d{6}$/.test(value.toString()),
        "Ingrese un Codigo Postal válido.",
      ],
    }
  );

  const UpdateUser = async () => {
    return await fetchPutUser(formState)
      .unwrap()
      .then(async () => {
        const updatedJwtInfo: JWTInfo = {
          ...jwtInfo,
          userInfo: formState,
        };
        await onLogin(updatedJwtInfo);
        Swal.fire("Éxito", "Datos Actualizados Correctamente", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
        throw error;
      });
  };

  return (
    <BasePage>
      <Grid
        container
        direction="column"
        sx={{
          alignItems: "center",
          p: 3,
        }}
      >
        <Grid
          container
          className="box-shadow animate__animated animate__fadeIn animate__faster"
          xs={10}
          alignItems={"center"}
          sx={{
            bgcolor: "#d6dbdf",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            border: "1px solid black",
          }}
        >
          <Typography variant="h6" marginLeft={2} sx={{ m: 1 }}>
            Configuracion
          </Typography>
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
            justifyContent={"center"}
            xs={10}
            sx={{
              bgcolor: "white",
              p: 3,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              border: "1px solid black",
            }}
          >
            <Grid item xs={4}>
              <img
                src="/logo.png"
                alt="Descripción de la imagen"
                width="150"
                height="150"
              />
            </Grid>
            <Grid item xs={6}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Nombre de la empresa"
                      placeholder="Nombre de la empresa"
                      fullWidth
                      size="small"
                      value={formState.nameCompany}
                      onChange={({ target: { value } }) =>
                        onChange("nameCompany", value)
                      }
                      error={!!errors.nameCompany}
                      helperText={errors.nameCompany}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Teléfono"
                      placeholder="Teléfono"
                      fullWidth
                      size="small"
                      value={formState.phoneNumber}
                      onChange={({ target: { value } }) => {
                        const phoneRegex = /^\+\d{3,12}$/;
                        phoneRegex.test(value) &&
                          onChange("phoneNumber", value);
                      }}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={false}
                      label=" Email"
                      placeholder=" Email"
                      fullWidth
                      size="small"
                      value={formState.email}
                      onChange={({ target: { value } }) =>
                        onChange("email", value)
                      }
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="IVA (%)"
                      placeholder="IVA (%)"
                      fullWidth
                      size="small"
                      value={formState.iva}
                      onChange={({ target: { value } }) => {
                        const ivaRegex = /^\d{0,2}$/;
                        ivaRegex.test(value) && onChange("iva", Number(value));
                      }}
                      error={!!errors.iva}
                      helperText={errors.iva}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Dirección"
                      placeholder="Dirección"
                      fullWidth
                      size="small"
                      value={formState.address}
                      onChange={({ target: { value } }) =>
                        onChange("address", value)
                      }
                      error={!!errors.nameCompany}
                      helperText={errors.nameCompany}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Ciudad"
                      placeholder="Ciudad"
                      fullWidth
                      size="small"
                      value={formState.city}
                      onChange={({ target: { value } }) =>
                        onChange("city", value)
                      }
                      error={!!errors.nameCompany}
                      helperText={errors.nameCompany}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Región/Provincia"
                      placeholder="Región/Provincia"
                      fullWidth
                      size="small"
                      value={formState.regionProvince}
                      onChange={({ target: { value } }) =>
                        onChange("regionProvince", value)
                      }
                      error={!!errors.nameCompany}
                      helperText={errors.nameCompany}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Código postal"
                      placeholder="Código postal"
                      fullWidth
                      size="small"
                      value={formState.zipcode}
                      onChange={({ target: { value } }) => {
                        const zipcodeRegex = /^\d{0,6}$/;
                        zipcodeRegex.test(value) &&
                          onChange("zipcode", Number(value));
                      }}
                      error={!!errors.zipcode}
                      helperText={errors.zipcode}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    spacing={2}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={4}>
                      <Button
                        disabled={!isFormValid() || isLoading}
                        variant="contained"
                        fullWidth
                        type="submit"
                        onClick={UpdateUser}
                      >
                        Actualizar Datos
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </BasePage>
  );
};
