import { Box } from "@mui/material";
import LoadingLottie from "../../assets/Loading.json";
import Lottie from "react-lottie";

export const LoadingScreen = () => {
  return (
    <Box
      sx={{
        //backgroundColor: theme.palette.primary.main,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: LoadingLottie,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={window.innerHeight * 0.5}
        width={window.innerHeight * 0.5}
      />
    </Box>
  );
};
