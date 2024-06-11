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
      fontSize: "22px",
      fontWeight: 700,
      fontFamily: "Strawford, sans-serif",
      color: "#355D78",
    },
    h2: {
      fontSize: "20px",
      fontWeight: 700,
      fontFamily: "Strawford, sans-serif",
      color: "#355D78",
    },
    h3: {
      fontSize: "18px",
      fontWeight: 700,
      fontFamily: "Strawford, sans-serif",
      color: "#192C38",
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 700,
      fontFamily: "Strawford, sans-serif",
      color: "#192C38",
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 700,
      fontFamily: "Strawford, sans-serif",
      color: "#192C38",
    },
    body1: {
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Strawford, sans-serif",
      color: "#192C38",
    },
    body2: {
      fontSize: "12px",
      fontWeight: 400,
      fontFamily: "Strawford, sans-serif",
      color: "#192C38",
    },
    // Agrega más estilos de tipografía según sea necesario
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "32px",
          fontSize: 16,
          fontWeight: 700,
          height: 40,
          textTransform: "capitalize",
          "&.Mui-disabled": {
            background: "#757575",
            borderColor: "#757575", // Color del borde cuando está deshabilitado
            color: "#ffffff", // Color del texto cuando está deshabilitado
          },
        },
        outlined: {
          borderColor: "#192C38", // Color del borde para el botón outlined
          color: "#192C38", // Color del texto para el botón outlined
          // "&:hover": {
          //   borderColor: "#388e3c", // Color del borde cuando se pasa el mouse
          //   color: "#388e3c", // Color del texto cuando se pasa el mouse
          // },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(53, 93, 120, 0.5)",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          width: 124,
          borderColor: "#b8c5d3",
          borderBottomWidth: 1.3,
          marginTop: 8,
          marginBottom: 8,
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
