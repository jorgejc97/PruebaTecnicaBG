import {
  MenuOutlined,
  LogoutOutlined,
  Home,
  Receipt,
  Settings,
  People,
  Person,
  List,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useAuthStore } from "../../shared";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const { onLogOut } = useAuthStore();

  const onPressLogOut = () => onLogOut();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography color="white" variant="h6" noWrap component={"div"}>
              INVOICE SYSTEM
            </Typography>
          </Box>

          {/* Links de Navegación */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={NavLink} to="/home" sx={{ color: "white" }}>
              <Home sx={{ mr: 1 }} />
              Inicio
            </Button>
            <Button component={NavLink} to="/facturas" sx={{ color: "white" }}>
              <Receipt sx={{ mr: 1 }} />
              Facturas
            </Button>
            <Button component={NavLink} to="/productos" sx={{ color: "white" }}>
              <List sx={{ mr: 1 }} />
              Productos
            </Button>
            <Button component={NavLink} to="/clientes" sx={{ color: "white" }}>
              <People sx={{ mr: 1 }} />
              Clientes
            </Button>
            <Button
              component={NavLink}
              to="/vendedores"
              sx={{ color: "white" }}
            >
              <Person sx={{ mr: 1 }} />
              Vendedores
            </Button>
            <Button
              component={NavLink}
              to="/configuration"
              sx={{ color: "white" }}
            >
              <Settings sx={{ mr: 1 }} />
              configuracion
            </Button>
          </Box>
          <IconButton color="error" onClick={onPressLogOut}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
