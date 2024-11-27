import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";

// import DataProvider from "./context/DataProvider";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    // <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Upon first loading of the app, this will be loaded first */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          {/* Protected pages. User should be "authenticated" first before they can access this page */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
           <Route path="/createaccount" element={<CreateAccount/>} />
          {/* Navigate - forces the browser to attach this path to the URL */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    // </DataProvider>
  );
}

export default App;
