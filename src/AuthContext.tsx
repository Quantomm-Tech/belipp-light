/* eslint-disable react-refresh/only-export-components */
// src/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: CognitoUser | null;
  signIn: (user: CognitoUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<CognitoUser | null>(null);
  const navigate = useNavigate();

  const signIn = (user: CognitoUser) => {
    setUser(user);
    navigate("/home");
  };

  const signOut = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
