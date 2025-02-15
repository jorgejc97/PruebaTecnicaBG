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
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled={false}
              label="Usuario"
              type="userName"
              placeholder="admin"
              fullWidth
              value={userName}
              onChange={({ target: { value } }) => onChange("userName", value)}
              error={!!errors.userName}
              helperText={errors.userName}
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
