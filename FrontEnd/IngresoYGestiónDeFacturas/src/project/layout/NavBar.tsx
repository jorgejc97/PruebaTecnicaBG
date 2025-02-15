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
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { useAuthStore } from "../../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const NavBar = () => {
  const { onLogOut } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);

  const handleNavigation = (event: any, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

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
          <Box sx={{ flexGrow: 1, maxWidth: "60%" }}>
            <BottomNavigation
              value={value}
              onChange={handleNavigation}
              showLabels
              sx={{ bgcolor: "transparent" }}
            >
              <BottomNavigationAction
                label="Inicio"
                value="/home"
                icon={<Home />}
                sx={{ "&.Mui-selected": { color: "white" } }}
              />
              <BottomNavigationAction
                label="Facturas"
                value="/facturas"
                icon={<Receipt />}
                sx={{ "&.Mui-selected": { color: "white" } }}
              />
              <BottomNavigationAction
                label="Productos"
                value="/productos"
                icon={<List />}
                sx={{ "&.Mui-selected": { color: "white" } }}
              />
              <BottomNavigationAction
                label="Clientes"
                value="/clientes"
                icon={<People />}
                sx={{ "&.Mui-selected": { color: "white" } }}
              />
              <BottomNavigationAction
                label="Vendedores"
                value="/vendedores"
                icon={<Person />}
                sx={{ "&.Mui-selected": { color: "white" } }}
              />
              <BottomNavigationAction
                label="Configuración"
                value="/configuration"
                icon={<Settings />}
                sx={{ "&.Mui-selected": { color: "white" } }}
              />
            </BottomNavigation>
          </Box>
          <IconButton color="error" onClick={onPressLogOut}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
