// src/Header.tsx
import React from "react";
import { useAuth } from "./AuthContext";
import { Box, Button } from "@mui/material";
import classes from "./Header.module.scss";

const Header: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Box className={classes.header}>
      <img
        src="https://d3n7cyfdcp067b.cloudfront.net/belipp/bel-logo__belipp.png"
        alt="Belipp"
      />
      <Button variant="text" onClick={signOut}>
        Cerrar sesión
      </Button>
    </Box>
  );
};

export default Header;
