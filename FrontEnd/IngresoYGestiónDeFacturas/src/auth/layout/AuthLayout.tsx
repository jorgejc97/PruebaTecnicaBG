import { Grid, Typography } from "@mui/material";
import { Children } from "../../interfaces";
import { Person } from "@mui/icons-material";

interface Props extends Children {
  title: string;
}

export const AuthLayout = ({ children, title }: Props) => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        height: "100vh",
        p: 3,
        overflow: "hidden",
        bgcolor: "secondary.main",
      }}
    >
      <Grid
        item
        className="box-shadow animate__animated animate__fadeIn animate__faster"
        xs={12}
        sm={4}
        sx={{
          width: { sm: 450 },
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          {title}
        </Typography>
        <Person
          sx={{
            fontSize: 80,
            color: "primary.main",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        {children}
      </Grid>

      <Grid
        item
        xs={12}
        sm={7.5}
        sx={{
          backgroundImage: 'url("/pantallalogin.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      ></Grid>
    </Grid>
  );
};
