import { useForm } from "../../hooks";
import { usePostLoginMutation } from "../../services";
import { useAuthStore } from "../../shared";
import { LoginInfo } from "../interfaces";
import { AuthLayout } from "../layout";
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";

let user = "";
let pass = "";

if (process.env.NODE_ENV === "development") {
  user = "admin";
  pass = "Abc123*+";
}
export const LoginPage = () => {
  const { onLogin } = useAuthStore();
  const [fetchLogin, { isLoading }] = usePostLoginMutation();

  const {
    formState: { userName, password },
    onChange,
    isFormValid,
    errors,
  } = useForm<LoginInfo>(
    {
      userName: user,
      password: pass,
    },
    {
      userName: [(value) => value.length > 2, "Ingrese un usuario válido"],
      password: [
        (value) => value.length >= 6,
        "El password debe tener más de 6 letras.",
      ],
    }
  );

  const onPressLogin = async () => {
    await fetchLogin({
      userName,
      password,
    })
      .unwrap()
      .then(async (jwt) => {
        await onLogin(jwt);
      })
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
      });
  };

  return (
    <AuthLayout title={"INVOICE SYSTEM"}>
      <Grid
        container
        sx={{
          px: 2,
          py: 4,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Grid item>
          <Typography variant="h4" align="center" sx={{ mb: 5 }}>
            Iniciar sesión
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Usuario"
                  type="text"
                  placeholder="admin"
                  fullWidth
                  value={userName}
                  onChange={({ target: { value } }) =>
                    onChange("userName", value)
                  }
                  error={!!errors.userName}
                  helperText={errors.userName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  fullWidth
                  value={password}
                  onChange={({ target: { value } }) =>
                    onChange("password", value)
                  }
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>

              <Grid item xs={12} container justifyContent="center" spacing={2}>
                <Grid item xs={6}>
                  <Button
                    disabled={!isFormValid() || isLoading}
                    variant="contained"
                    fullWidth
                    onClick={onPressLogin}
                  >
                    LOGIN
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      {/* Backdrop para mostrar el cargando globalmente */}
      <Backdrop open={isLoading} sx={{ zIndex: 1000, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </AuthLayout>
  );
};
