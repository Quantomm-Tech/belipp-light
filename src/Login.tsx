import React, { useState } from "react";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const config = {
      region: "us-east-1",
      userPoolId: "us-east-1_pUO2sK4Y2",
      userPoolWebClientId: "d2axrrf5qqsyaw",
    };

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
        });
      });
      console.log("Login successful");
      // Redireccionar o realizar otras acciones después del login exitoso
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
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
  );
};

export default Login;
