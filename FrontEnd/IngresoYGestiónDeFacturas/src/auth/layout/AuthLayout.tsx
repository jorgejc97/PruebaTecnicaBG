import { Grid, Typography } from "@mui/material";
import { Children } from "../../interfaces";
import { VpnKey } from "@mui/icons-material";

interface Props extends Children {
  title: string;
}

export const AuthLayout = ({ children, title }: Props) => {
  return (
    <Grid
      container
      spacing={0}
      //direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", bgcolor: "primary.main", p: 4 }}
    >
      <Grid
        item
        className="box-shadow animate__animated animate__fadeIn animate__faster"
        xs={4}
        sx={{
          width: { sm: 450 },
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          {title}
        </Typography>
        <VpnKey
          sx={{
            fontSize: 50,
            mb: 3,
            color: "primary.main",
            mr: 1,
          }}
        />

        {children}
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
};
