// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ProtectedRoute from "./ProtectedRoute";

import { AuthProvider, useAuth } from "./AuthContext";
import CreditApplications from "./pages/creditApplications/CreditApplications";
import Header from "./Header";
import CreditApplicationDetail from "./pages/creditApplications/CreditApplicationDetail";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route
              element={
                <>
                  <Header />
                  <Outlet />
                </>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route
                path="/credit/application"
                element={<CreditApplications />}
              />
              <Route
                path="/credit/detail/:requestId"
                element={<CreditApplicationDetail />}
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const AuthRedirect: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default App;
