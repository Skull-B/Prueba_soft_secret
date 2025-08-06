import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

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
        {user ? (
          <>
            <NavLink
              to="/actas"
              style={({ isActive }) =>
                isActive ? { ...styles.link, ...styles.active } : styles.link
              }
            >
              Actas
            </NavLink>

            <NavLink
              to="/gestiones"
              style={({ isActive }) =>
                isActive ? { ...styles.link, ...styles.active } : styles.link
              }
            >
              Gestiones
            </NavLink>

            <span style={{ color: "#fff", marginRight: "10px" }}>
              {user.nombre} ({user.rol})
            </span>

            <button onClick={handleLogout} style={styles.logoutBtn}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.active } : styles.link
            }
          >
            Login
          </NavLink>
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
    padding: "5px 8px",
    borderRadius: "4px",
  },
  active: {
    background: "#555",
    fontWeight: "bold",
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
