import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Api/Conexion";

function NuevaGestion() {
  const { id } = useParams(); // Este 'id' es del acta o del compromiso?
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    fecha: "",
    descripcion: "",
    Archivo: null, // Cambié a 'Archivo' para que coincida con el modelo
    compromiso: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Archivo") {
      setFormulario({ ...formulario, Archivo: files[0] });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formulario.Archivo) {
      const ext = formulario.Archivo.name.split(".").pop().toLowerCase();
      if (!["pdf", "jpg"].includes(ext)) {
        setError("El archivo debe ser PDF o JPG");
        return;
      }
      if (formulario.Archivo.size > 5 * 1024 * 1024) {
        setError("El archivo debe ser menor de 5MB");
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("fecha", formulario.fecha);
      formData.append("descripcion", formulario.descripcion);
      if (formulario.Archivo) formData.append("Archivo", formulario.Archivo); // Coincide con el modelo
      formData.append("compromiso", formulario.compromiso);

      await api.post(`documentos/gestiones/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      alert("Gestión creada exitosamente");
      navigate(`/actas/${id}`);
    } catch (err) {
      console.error("Error al crear la gestión:", err.response?.data || err.message);
      alert("Error al crear la gestión");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nueva Gestión</h2>
      <button onClick={() => navigate(`/actas/${id}`)}>⬅ Volver</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px"
        }}
      >
        <label>
          Fecha y hora:
          <input
            type="datetime-local"
            name="fecha"
            value={formulario.fecha}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={formulario.descripcion}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Compromiso (ID):
          <input
            type="text"
            name="compromiso"
            value={formulario.compromiso}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Archivo (PDF/JPG):
          <input type="file" name="Archivo" onChange={handleChange} />
        </label>

        <button type="submit">Guardar Gestión</button>
      </form>
    </div>
  );
}

export default NuevaGestion;
