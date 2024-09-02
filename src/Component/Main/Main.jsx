import { Box, Typography } from "@mui/material";
import React from "react";

function Main() {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "600px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            'url("https://image.tmdb.org/t/p/w1280/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg")',
          

          }}
      >
      
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: " linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%)", 
          zIndex: 0, 
        }}
      />

      <Typography
      variant="h4"
      sx={{
        position: "absolute",
        zIndex: 1,
        bottom: 120,
        left: 60,
        color: 'white',
        fontWeight: '700',
      }}
    >
        Title

    </Typography>


    <Typography
    variant="h5"
    sx={{
      position: "absolute",
      zIndex: 1,
      bottom: 60,
      left: 60,
      color: 'white',
      fontWeight: '700',
    }}
  >
  This is just a film description to get from the api



  </Typography>


      </Box>

     
    </>
  );
}

export default Main;
