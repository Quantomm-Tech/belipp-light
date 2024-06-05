import React, { useState } from "react";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

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
          onSuccess: () => resolve(),
          onFailure: (err) => reject(err),
          newPasswordRequired: (userAttributes) => {
            setCognitoUser(user); // Guarda la instancia del usuario

            // Elimina los atributos que no se pueden actualizar
            delete userAttributes.email_verified;
            setStage("NEW_PASSWORD_REQUIRED");
            resolve();
          },
        });
      });
      if (stage === "LOGIN") {
        console.log("Login successful");
        // Redireccionar o realizar otras acciones después del login exitoso
      }
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
            onSuccess: () => resolve(),
            onFailure: (err) => reject(err),
          }
        );
      });
      console.log("Password updated successfully");
      // Redireccionar o realizar otras acciones después del cambio de contraseña exitoso
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <>
      {stage === "LOGIN" && (
        <form onSubmit={handleSubmit}>
          <input
            type=""
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
      {stage === "NEW_PASSWORD_REQUIRED" && (
        <form onSubmit={handleNewPasswordSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Set New Password</button>
        </form>
      )}
    </>
  );
};

export default Login;
