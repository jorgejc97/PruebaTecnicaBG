import { AuthLayout } from "../layout";
import { Alert, Button, Grid, TextField } from "@mui/material";

let user = "";
let pass = "";

export const Loginpage = () => {
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
              value={user}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled={false}
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              value={pass}
              onChange={() => {}}
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
                variant="contained"
                fullWidth
                type="submit"
                onClick={undefined}
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
