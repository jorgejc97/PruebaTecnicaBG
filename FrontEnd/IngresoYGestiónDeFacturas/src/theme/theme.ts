import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#427D9D",
    },
    secondary: {
      main: "#9BBEC8",
    },
    error: {
      main: red.A400,
    },
  },
});
