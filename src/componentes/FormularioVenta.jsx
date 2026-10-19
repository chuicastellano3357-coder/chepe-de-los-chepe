import React, { useState, useEffect } from 'react';
import API from '../api';

function FormularioVenta({ onVentaRegistrada }) {
  // Función auxiliar para obtener la fecha actual en formato YYYY-MM-DD
  const getFechaActual = () => new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    estudiante_id: '',
    producto_id: '',
    cantidad: '',
    fecha: getFechaActual()
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Obtener estudiantes desde tu backend
    API.get('/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error('Error al obtener estudiantes:', err));

    // Obtener productos desde tu backend
    API.get('/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al obtener productos:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/ventas', formData)
      .then(() => {
        // Reiniciar el formulario manteniendo la fecha del día
        setFormData({
          estudiante_id: '',
          producto_id: '',
          cantidad: '',
          fecha: getFechaActual()
        });

        if (onVentaRegistrada) {
          onVentaRegistrada(); // Refresca la tabla o lista general de ventas
        }
      })
      .catch(err => console.error('Error al registrar la venta:', err));
  };

  return (
    <div>
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Estudiante:</label>
          <select
            name="estudiante_id"
            value={formData.estudiante_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un estudiante</option>
            {estudiantes.map(e => (
              <option key={e.id} value={e.id}>
                {e.nombre} - {e.grupo || e.grado || ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Producto:</label>
          <select
            name="producto_id"
            value={formData.producto_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre} - ${p.precio}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
}

export default FormularioVenta;