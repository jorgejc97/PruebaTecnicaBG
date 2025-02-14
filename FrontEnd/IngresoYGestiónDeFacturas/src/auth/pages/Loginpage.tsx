import { useForm } from "../../hooks";
import { usePostLoginMutation } from "../../services";
import { useAuthStore } from "../../shared";
import { LoginInfo } from "../interfaces";
import { AuthLayout } from "../layout";
import { Alert, Button, Grid, TextField } from "@mui/material";
import Swal from "sweetalert2";

let user = "";
let pass = "";

if (process.env.NODE_ENV === "development") {
  user = "admin@correo.com";
  pass = "Abc123*+";
}
export const LoginPage = () => {
  const { onLogin } = useAuthStore();
  const [fetchLogin, { isLoading }] = usePostLoginMutation();

  const {
    formState: { email, password },
    onChange,
    isFormValid,
    errors,
  } = useForm<LoginInfo>(
    {
      email: user,
      password: pass,
    },
    {
      email: [(value) => value.length > 2, "Ingrese un correo válido"],
      password: [
        (value) => value.length >= 6,
        "El password debe tener más de 6 letras.",
      ],
    }
  );

  const onPressLogin = async () => {
    await fetchLogin({
      email,
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
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled={false}
              label="Correo"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              value={email}
              onChange={({ target: { value } }) => onChange("email", value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled={false}
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              value={password}
              onChange={({ target: { value } }) => onChange("password", value)}
              error={!!errors.password}
              helperText={errors.password}
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
            <Grid item xs={12} display={"none"}>
              <Alert severity="error">hola</Alert>
            </Grid>

            <Grid item xs={6}>
              <Button
                disabled={!isFormValid() || isLoading}
                variant="contained"
                fullWidth
                type="submit"
                onClick={onPressLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
