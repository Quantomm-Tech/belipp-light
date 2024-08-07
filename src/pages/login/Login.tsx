// src/Login.tsx
import React, { useState } from "react";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { Box, Button, TextField } from "@mui/material";
import classes from "./Login.module.scss";
import { useAuth } from "../../AuthContext";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import { translateCognitoError } from "../../utils/utils";

const config = {
  region: "us-east-1",
  userPoolId: "us-east-1_pUO2sK4Y2",
  userPoolWebClientId: "5gpqcc7nudcf33f6ant01nlatn",
};

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stage, setStage] = useState<"LOGIN" | "NEW_PASSWORD_REQUIRED">(
    "LOGIN"
  );
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);
  const [error, setError] = useState("");

  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userPool = new CognitoUserPool({
      UserPoolId: config.userPoolId,
      ClientId: config.userPoolWebClientId,
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    try {
      await new Promise<void>((resolve, reject) => {
        user.authenticateUser(authenticationDetails, {
          onSuccess: (session) => {
            const token = session.getIdToken().getJwtToken();
            signIn(token); // Llama a signIn del AuthContext
            resolve();
          },
          onFailure: (err) => {
            const translatedError = translateCognitoError(
              err.message || "Error de autenticación"
            );
            setError(translatedError);
            reject(err);
          },
          newPasswordRequired: (userAttributes) => {
            setCognitoUser(user); // Guarda la instancia del usuario
            delete userAttributes.email_verified;
            setStage("NEW_PASSWORD_REQUIRED");
            resolve();
          },
        });
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleNewPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!cognitoUser) {
      console.error("No Cognito user available");
      return;
    }
    try {
      await new Promise<void>((resolve, reject) => {
        cognitoUser.completeNewPasswordChallenge(
          newPassword,
          {},
          {
            onSuccess: (session) => {
              const token = session.getIdToken().getJwtToken();
              signIn(token); // Llama a signIn del AuthContext
              resolve();
            },
            onFailure: (err) => {
              const translatedError = translateCognitoError(
                err.message || "Error de autenticación"
              );
              setError(translatedError);
              reject(err);
            },
          }
        );
      });
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <>
      <Box className={classes.login__container}>
        <Box className={classes.login__form}>
          <Box mt={1} mb={2}>
            <img
              src={`${import.meta.env.VITE_CDN}/bel-logo__belipp.png`}
              alt="Belipp"
            />
          </Box>

          {stage === "LOGIN" && (
            <form onSubmit={handleSubmit}>
              <Box mb={1}>
                <TextField
                  fullWidth
                  placeholder="Usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
              </Box>
              <Box mb={1}>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="*****"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></TextField>
              </Box>
              <Box mt={2} mb={1} className={classes.login__actions}>
                <Button type="submit" variant="contained" fullWidth>
                  Iniciar sesión
                </Button>
              </Box>
            </form>
          )}

          {stage === "NEW_PASSWORD_REQUIRED" && (
            <form onSubmit={handleNewPasswordSubmit}>
              <Box mb={1}>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></TextField>
              </Box>

              <Box mt={2} mb={1} className={classes.login__actions}>
                <Button type="submit" variant="contained" fullWidth>
                  Cambiar contraseña
                </Button>
              </Box>
            </form>
          )}

          {error && <ErrorMessage sx={{ mt: 2 }}>{error}</ErrorMessage>}
        </Box>
      </Box>
    </>
  );
};

export default Login;
