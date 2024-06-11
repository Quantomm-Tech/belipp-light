import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
