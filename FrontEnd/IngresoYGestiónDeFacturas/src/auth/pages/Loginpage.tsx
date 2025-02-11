import React from "react";
import { AuthLayout } from "../layout";
import { Alert, Button, Grid, TextField } from "@mui/material";

let user = "";
let pass = "";

export const Loginpage = () => {
  return (
    <AuthLayout title={"Login"}>
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
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
          <Grid item xs={12} sx={{ mt: 2 }}>
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
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={"none"}>
              <Alert severity="error">hola</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
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
