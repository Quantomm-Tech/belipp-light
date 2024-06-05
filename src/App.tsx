// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";

import { AuthProvider } from "./AuthContext";
import CreditApplications from "./creditApplications/CreditApplications";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route
              path="/credit/application"
              element={<CreditApplications />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
