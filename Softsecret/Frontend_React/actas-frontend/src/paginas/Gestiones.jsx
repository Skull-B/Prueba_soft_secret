import React, { useEffect, useState } from "react";
import api from "../Api/Conexion";

function ListaGestiones() {
  const [gestiones, setGestiones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGestiones = async () => {
      try {
        const res = await api.get("documentos/gestiones/");
        setGestiones(res.data);
      } catch (error) {
        console.error("Error al cargar gestiones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGestiones();
  }, []);

  if (loading) return <div>Cargando gestiones...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Gestiones</h2>
      {gestiones.length === 0 ? (
        <p>No hay gestiones disponibles.</p>
      ) : (
        <ul>
          {gestiones.map((g) => (
            <li key={g.id} style={{ marginBottom: "10px" }}>
              <b>{g.descripcion}</b> - Fecha: {new Date(g.fecha).toLocaleDateString()} - 
              Compromiso: {g.compromiso_descripcion || g.compromiso}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaGestiones;