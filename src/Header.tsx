// src/Header.tsx
import React from "react";
import { useAuth } from "./AuthContext";
import { Box, Button } from "@mui/material";
import classes from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <Box className={classes.header}>
      <img
        src="https://d3n7cyfdcp067b.cloudfront.net/belipp/bel-logo__belipp.png"
        alt="Belipp"
        onClick={() => {
          navigate("/home");
        }}
      />
      <Button variant="text" onClick={signOut}>
        Cerrar sesión
      </Button>
    </Box>
  );
};

export default Header;
