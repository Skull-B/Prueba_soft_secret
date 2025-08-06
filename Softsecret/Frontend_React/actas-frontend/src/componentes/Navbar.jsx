import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  // Leer usuario de forma segura
  let storedUser = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      storedUser = JSON.parse(userData);
    }
  } catch (err) {
    console.error("Error parsing user from localStorage", err);
    localStorage.removeItem("user");
  }

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <h3 style={{ margin: 0, color: "#fff" }}>Gestión de Actas</h3>
      </div>
      <div style={styles.right}>
        {storedUser ? (
          <>
            <Link to="/actas" style={styles.link}>Actas</Link>
            {storedUser.rol === "admin" && (
              <Link to="/gestiones" style={styles.link}>Gestiones</Link>
            )}
            <span style={{ color: "#fff", marginRight: "10px" }}>
              {storedUser.nombre} ({storedUser.rol})
            </span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    background: "#333",
    padding: "10px",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    marginRight: "10px",
    textDecoration: "none",
  },
  logoutBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Navbar;
