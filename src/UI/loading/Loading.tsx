import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export default Loading;
