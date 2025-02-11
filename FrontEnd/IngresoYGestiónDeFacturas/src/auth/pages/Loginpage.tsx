import { jwtDecode } from "jwt-decode";
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
  user = "admin";
  pass = "A!avc89043";
}
export const LoginPage = () => {
  const { onLogin } = useAuthStore();
  const [fetchLogin, { isLoading }] = usePostLoginMutation();

  const {
    formState: { username, password },
    onChange,
    isFormValid,
    errors,
  } = useForm<LoginInfo>(
    {
      username: user,
      password: pass,
    },
    {
      username: [(value) => value.length > 2, "Ingrese un correo válido"],
      password: [
        (value) => value.length >= 6,
        "El password debe tener más de 6 letras.",
      ],
    }
  );

  const onPressLogin = async () => {
    await fetchLogin({
      username,
      password,
    })
      .unwrap()
      .then(async (jwt) => {
        const decoded: {
          email: string;
          exp: number;
        } = jwtDecode(jwt.token);
        await onLogin({ ...jwt, userName: decoded.email });
      })
      .catch((error) => {
        Swal.fire("Error", error?.data?.detail ?? "Ocurrió un error", "error");
      });
  };
  return (
    <AuthLayout title={"Login"}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled={false}
              label="Correo"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              value={username}
              onChange={({ target: { value } }) => onChange("username", value)}
              error={!!errors.username}
              helperText={errors.username}
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
