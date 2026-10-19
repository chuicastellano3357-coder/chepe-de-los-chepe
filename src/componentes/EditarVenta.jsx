import React, { useState, useEffect } from 'react';
import API from '../api';

function EditarVenta({ venta, onCerrar, onVentaActualizada }) {
  const [formData, setFormData] = useState({
    estudiante_id: venta.estudiante_id,
    producto_id: venta.producto_id,
    cantidad: venta.cantidad,
    fecha: venta.fecha ? venta.fecha.split('T')[0] : ''
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setFormData({
      estudiante_id: venta.estudiante_id,
      producto_id: venta.producto_id,
      cantidad: venta.cantidad,
      fecha: venta.fecha ? venta.fecha.split('T')[0] : ''
    });
  }, [venta]);

  useEffect(() => {
    // Carga de estudiantes desde tu API
    API.get('/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error('Error al obtener estudiantes:', err));

    // Carga de productos desde tu API
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
    API.put(`/ventas/${venta.id}`, formData)
      .then(() => {
        if (onVentaActualizada) {
          onVentaActualizada();
        }
        if (onCerrar) {
          onCerrar();
        }
      })
      .catch(err => console.error('Error al actualizar la venta:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Estudiante:</label>
        <select name="estudiante_id" value={formData.estudiante_id} onChange={handleChange} required>
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
        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
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

      <button type="submit">Actualizar Venta</button>
    </form>
  );
}

export default EditarVenta;