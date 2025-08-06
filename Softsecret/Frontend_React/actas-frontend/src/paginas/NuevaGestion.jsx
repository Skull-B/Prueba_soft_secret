import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function NuevaGestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    fecha: "",
    descripcion: "",
    archivo: null,
    compromiso: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "archivo") {
      setFormulario({ ...formulario, archivo: files[0] });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones de archivo
    if (formulario.archivo) {
      const ext = formulario.archivo.name.split(".").pop().toLowerCase();
      if (!["pdf", "jpg"].includes(ext)) {
        setError("El archivo debe ser PDF o JPG");
        return;
      }
      if (formulario.archivo.size > 5 * 1024 * 1024) {
        setError("El archivo debe ser menor de 5MB");
        return;
      }
    } else {
      setError("Debe seleccionar un archivo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fecha", formulario.fecha);
      formData.append("descripcion", formulario.descripcion);
      formData.append("archivo", formulario.archivo);
      formData.append("compromiso", formulario.compromiso);

      const token = localStorage.getItem("access");

      await axios.post(`http://127.0.0.1:8000/documentos/Gestiones/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      alert("Gestión creada exitosamente");
      navigate(`/actas/${id}`);
    } catch (err) {
      console.error("Error al crear la gestión:", err);
      alert("Error al crear la gestión");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>➕ Nueva Gestión</h2>
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
          Fecha:
          <input
            type="date"
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
          Archivo:
          <input type="file" name="archivo" onChange={handleChange} required />
        </label>

        <button type="submit">Guardar Gestión</button>
      </form>
    </div>
  );
}

export default NuevaGestion;

