export const getMil = (value: number | bigint | null | undefined) => {
  let valueFormated = "";
  if (value === null || value === undefined) {
    //@ts-ignore
    valueFormated = 0;
  } else {
    //@ts-ignore
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
