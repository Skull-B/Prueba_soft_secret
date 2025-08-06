import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Api/Conexion";

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
      const res = await api.get(`documentos/actas/${id}/`); // asegúrate que la URL es correcta y coincide con el backend
      setActa(res.data);
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
      <h2>Detalle del Acta</h2>
      <button onClick={() => navigate("/actas")}>⬅ Volver</button>

      <div style={{ marginTop: "15px" }}>
        <p><b>Título:</b> {acta.titulo}</p>
        <p><b>Estado:</b> {acta.estado}</p>
        <p><b>Fecha:</b> {acta.fecha}</p>
        <p><b>Creador:</b> {acta.creador}</p>

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

      <h3>Compromisos</h3>
      {acta.compromisos && acta.compromisos.length > 0 ? (
        <ul>
          {acta.compromisos.map((comp) => (
            <li key={comp.id} style={{ marginBottom: "10px" }}>
              <b>{comp.descripcion}</b> - Responsable: {comp.responsable}
              <br />
              <button
                style={{ marginTop: "5px" }}
                onClick={() => navigate(`/compromisos/${comp.id}/gestiones/nueva`)}
              >
                 Agregar Gestión
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay compromisos asociados</p>
      )}
    </div>
  );
}

export default ActaDetalle;
