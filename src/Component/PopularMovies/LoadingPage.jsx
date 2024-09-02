import React from "react";
import { Backdrop, CircularProgress, Box, Typography } from "@mui/material";

function LoadingPage() {
  return (
    <Backdrop
      sx={{ color: "rgb(0,0,0,0.7)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CircularProgress sx={{color:'whitesmoke'}} />
        <Typography variant="h6" sx={{ marginTop: 2, color:'whitesmoke' }}>
          Loading...
        </Typography>
      </Box>
    </Backdrop>
  );
}

export default LoadingPage;
