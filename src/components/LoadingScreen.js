import { CircularProgress, Paper, Box, Typography } from "@mui/material";
import React from "react";

const LoadingScreen = () => {
  return (
    // <Paper elevation={6} className={"loadingPaper"}>
    //   <CircularProgress size="7em" />
    // </Paper>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4" color="primary">
        Loading
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
