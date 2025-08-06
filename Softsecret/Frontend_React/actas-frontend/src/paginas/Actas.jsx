import { useEffect, useState } from "react";
import api from "../Api/Conexion";
import { useNavigate } from "react-router-dom";

function Actas() {
  const [actas, setActas] = useState([]);
  const [estado, setEstado] = useState("");
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchActas();
  }, []);

  const fetchActas = async () => {
    try {
      const response = await api.get("documentos/actas/"); // URL corregida
      setActas(response.data);
    } catch (error) {
      console.error("Error al obtener actas:", error);
    }
  };

  const handleDetalle = (id) => {
    navigate(`/actas/${id}`); // Ruta corregida
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Actas</h2>

      {/* FILTROS */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <button onClick={fetchActas}>Buscar</button>
      </div>

      {/* TABLA */}
      <table border="1" cellPadding="5" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Compromisos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actas.length > 0 ? (
            actas.map((acta) => (
              <tr key={acta.id}>
                <td>{acta.titulo}</td>
                <td>{acta.estado}</td>
                <td>{acta.fecha}</td>
                <td>{acta.compromisos ? acta.compromisos.length : 0}</td>
                <td>
                  <button onClick={() => handleDetalle(acta.id)}>
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No hay actas disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Actas;