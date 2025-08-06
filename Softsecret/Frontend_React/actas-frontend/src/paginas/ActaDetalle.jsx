import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ActaDetalle() {
  const { id } = useParams();
  const [acta, setActa] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActa();
  }, [id]);

  const fetchActa = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(`http://127.0.0.1:8000/documentos/Actas/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActa(response.data);
    } catch (error) {
      console.error("Error al obtener acta:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!acta) return <div>Acta no encontrada</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📄 Detalle del Acta</h2>
      <button onClick={() => navigate("/actas")}>⬅ Volver</button>

      <div style={{ marginTop: "15px" }}>
        <p><b>Título:</b> {acta.titulo}</p>
        <p><b>Estado:</b> {acta.estado}</p>
        <p><b>Fecha:</b> {acta.fecha}</p>
        <p><b>Creador:</b> {acta.creador}</p>

        {/* Mostrar PDF si existe */}
        {acta.Archivo && (
          <p>
            <b>Archivo:</b>{" "}
            <a
              href={`http://127.0.0.1:8000${acta.Archivo}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver PDF
            </a>
          </p>
        )}
      </div>

      {/* Lista de compromisos */}
      <h3>📌 Compromisos</h3>
      {acta.compromisos && acta.compromisos.length > 0 ? (
        <ul>
          {acta.compromisos.map((comp) => (
            <li key={comp.id}>
              <b>{comp.descripcion}</b> - Responsable: {comp.responsable}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay compromisos asociados</p>
      )}

      {/* Botón para agregar gestión */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate(`/actas/${id}/gestiones/nueva`)}>
          ➕ Agregar Gestión
        </button>
      </div>
    </div>
  );
}

export default ActaDetalle;
