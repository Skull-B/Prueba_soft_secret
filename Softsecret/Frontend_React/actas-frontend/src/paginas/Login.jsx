import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/Conexion";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("usuarios/login/", {
        correo,
        contrasena: contraseña, // usa el nombre correcto que espera tu backend
      });

      console.log("Respuesta login:", res.data); // debug

      const data = res.data; // aquí definimos data

      // Guardar en localStorage usando las claves correctas que devuelve tu backend
      localStorage.setItem("access", data.token.access);
      localStorage.setItem("refresh", data.token.refresh);
      localStorage.setItem("user", JSON.stringify(data.usuario)); // "usuario" según tu backend

      // Actualizar estado del usuario
      setUser(data.usuario);

      navigate("/actas");
    } catch (err) {
      console.error("Error en login:", err);
      if (err.response && err.response.status === 401) {
        setError("Credenciales inválidas");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#333",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
