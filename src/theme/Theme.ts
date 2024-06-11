// src/theme.ts

import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#355D78",
    },
    secondary: {
      main: "#192C38",
    },
    error: {
      main: "#b81414",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "20px",
      fontWeight: 700,
      fontFamily: "Strawford, sans-serif",
      color: "#355D78",
    },
    h2: {
      fontSize: "18px",
      fontWeight: 700,
      fontFamily: "Strawford, sans-serif",
      color: "#192C38",
    },
    // Agrega más estilos de tipografía según sea necesario
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    // Agrega más personalizaciones de componentes según sea necesario
  },
};

const theme = createTheme(themeOptions);

export default theme;
