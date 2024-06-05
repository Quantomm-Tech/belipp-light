import React from "react";
import { Box, Typography } from "@mui/material";
import classes from "./Home.module.scss";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className={classes.home}>
      <Box
        className={classes.home__card}
        onClick={() => {
          navigate("/credit/application");
        }}
      >
        <img
          src="https://d3n7cyfdcp067b.cloudfront.net/ben-estado-solicitudes.png"
          alt="Listado de solicitudes"
        />
        <Typography variant="subtitle1">
          Solicitudes pendientes de desembolso
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
