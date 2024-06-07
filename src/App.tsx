// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";

import { AuthProvider } from "./AuthContext";
import CreditApplications from "./pages/creditApplications/CreditApplications";
import Header from "./Header";
import CreditApplicationDetail from "./pages/creditApplications/CreditApplicationDetail";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
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

export default App;
