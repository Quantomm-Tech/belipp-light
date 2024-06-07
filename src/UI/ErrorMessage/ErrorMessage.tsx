import React from "react";
import { Typography, SxProps, Theme } from "@mui/material";

interface ErrorMessageProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>; // Propiedad opcional para estilos
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, sx }) => {
  return (
    <Typography variant="body2" color="error" sx={{ ...sx }}>
      {children}
    </Typography>
  );
};

export default ErrorMessage;
