import moment from "moment";

export const getMil = (value) => {
  let valueFormated = "";
  if (value === null || value === undefined) {
    valueFormated = 0;
  } else {
    value = Math.round(value);

    valueFormated = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(value);
  }
  return valueFormated;
};

export const formatDate = (date, format) => {
  return moment(date).format(format);
};

// src/utils/translateCognitoError.ts

export const translateCognitoError = (errorMessage: string): string => {
  switch (errorMessage) {
    case "User does not exist.":
      return "El usuario no existe.";
    case "Incorrect username or password.":
      return "Nombre de usuario o contraseña incorrectos.";
    case "User is not confirmed.":
      return "El usuario no está confirmado.";
    case "Password attempts exceeded":
      return "Se excedió el número de intentos de contraseña.";
    case "Network error":
      return "Error de red.";
    case "Password does not conform to policy: Password not long enough":
      return "La constraseña no cumple con las políticas de seguridad";
    default:
      return "Error de autenticación.";
  }
};
