// src/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem("cognitoToken");
    if (session) {
      // Aquí podrías validar el token o simplemente confiar en él por ahora
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("cognitoToken", token);
    setIsAuthenticated(true);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("cognitoToken");
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Mostrar un indicador de carga mientras se verifica el estado de autenticación
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn: login, signOut: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// /* eslint-disable react-refresh/only-export-components */
// // src/AuthContext.tsx
// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";
// import { CognitoUser } from "amazon-cognito-identity-js";
// import { useNavigate } from "react-router-dom";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: CognitoUser | null;
//   signIn: (user: CognitoUser, session: string) => void;
//   signOut: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<CognitoUser | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   const signIn = (user: CognitoUser, session: string) => {
//     setUser(user);

//     localStorage.setItem("token__cognito", session);
//     setIsAuthenticated(true);
//     navigate("/home");
//   };

//   const signOut = () => {
//     setUser(null);
//     localStorage.removeItem("token__cognito");
//     navigate("/login");
//   };

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token__cognito");
//   //   if (token) {
//   //     // Si hay un token almacenado, asumimos que el usuario está autenticado
//   //     setUser({} as CognitoUser); // Puedes cargar la información del usuario aquí si es necesario
//   //   }
//   // }, []);

//   useEffect(() => {
//     const session = localStorage.getItem("token__cognito");
//     if (session) {
//       // Aquí podrías validar el token o simplemente confiar en él por ahora
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
