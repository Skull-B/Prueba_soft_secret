import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Login from "./paginas/Login";
import Actas from "./paginas/Actas";
import ActaDetalle from "./paginas/ActaDetalle";
import NuevaGestion from "./paginas/NuevaGestion";
import ProtectedRoute from "./componentes/ProtectedRoute";

function App() {

  const [user, setUser] = useState(() => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser || storedUser === "undefined" || storedUser === "null") {
      return null;
    }
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Error al parsear el usuario:", error);
    return null;
  }
});

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route
          path="/actas"
          element={
            <ProtectedRoute>
              <Actas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/actas/:id"
          element={
            <ProtectedRoute>
              <ActaDetalle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/actas/:id/gestiones/nueva"
          element={
            <ProtectedRoute>
              {user?.rol === "admin" ? <NuevaGestion /> : <Navigate to="/actas" />}
            </ProtectedRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;