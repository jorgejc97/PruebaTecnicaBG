import { Delete, Edit } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

export const SellersPage = () => {
  const users = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "1234567890",
    },
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "1234567890",
    },
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "1234567890",
    },
    {
      id: 2,
      name: "María López",
      email: "maria@example.com",
      phone: "0987654321",
    },
    // Agrega más usuarios según sea necesario
  ];

  {
    /* <Grid item xs={12}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={"age"}
        label="Age"
        onChange={undefined}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  </Grid> */
  }

  return (
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
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        xs={10}
        sx={{
          bgcolor: "#d6dbdf",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          border: "1px solid black",
        }}
      >
        <Grid item margin={1}>
          <Typography variant="h6">Buscar Vendedores</Typography>
        </Grid>

        <Grid item margin={1}>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            onClick={undefined}
          >
            Nuevo Vendedor
          </Button>
        </Grid>
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
          xs={10}
          sx={{
            bgcolor: "white",
            p: 2,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            border: "1px solid black",
          }}
        >
          <Grid container justifyContent={"center"}>
            <Grid item xs={5} margin={2}>
              <TextField
                label="Nombres del Usuario"
                placeholder="Código postal"
                fullWidth
                size="small"
                /* value={password}
                        onChange={({ target: { value } }) => onChange("password", value)}
                        error={!!errors.password}
                        helperText={errors.password} */
              />
            </Grid>

            <Grid item margin={2}>
              <Button
                //disabled={!isFormValid() || isLoading}
                variant="contained"
                fullWidth
                type="submit"
                onClick={undefined}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>

          <Grid container alignContent={"center"} justifyContent={"center"}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ backgroundColor: "skyblue", fontWeight: "bold" }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "skyblue", fontWeight: "bold" }}
                    >
                      Nombre
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "skyblue", fontWeight: "bold" }}
                    >
                      Correo
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "skyblue", fontWeight: "bold" }}
                    >
                      Teléfono
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "skyblue", fontWeight: "bold" }}
                    >
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          aria-label="edit"
                          sx={{
                            borderRadius: "4px",
                            "&:hover": {
                              backgroundColor: "#1976d2",
                              color: "white",
                            },
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="delete"
                          sx={{
                            borderRadius: "4px",
                            "&:hover": {
                              backgroundColor: "#d32f2f",
                              color: "white",
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
