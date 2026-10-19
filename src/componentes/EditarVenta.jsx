import React, { useState, useEffect } from 'react';
import API from '../api';

function EditarVenta({ venta, onCerrar, onVentaActualizada }) {
  const [formData, setFormData] = useState({
    estudiante_id: '',
    producto_id: '',
    cantidad: '',
    fecha: ''
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Cargar listas de estudiantes y productos
    API.get('/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error('Error al cargar estudiantes:', err));

    API.get('/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err));

    // Precargar los datos de la venta seleccionada
    if (venta) {
      const fechaFormateada = venta.fecha ? venta.fecha.split('T')[0] : '';
      setFormData({
        estudiante_id: venta.estudiante_id || '',
        producto_id: venta.producto_id || '',
        cantidad: venta.cantidad || '',
        fecha: fechaFormateada
      });
    }
  }, [venta]);

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
      .catch(err => console.error('Error al actualizar venta:', err));
  };

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #444', borderRadius: '8px' }}>
      <h3>Editar Venta #{venta.id}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Estudiante: </label>
          <select 
            name="estudiante_id" 
            value={formData.estudiante_id} 
            onChange={handleChange} 
            required
          >
            <option value="">Seleccione estudiante</option>
            {estudiantes.map(e => (
              <option key={e.id} value={e.id}>
                {e.nombre} - {e.grupo}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Producto: </label>
          <select 
            name="producto_id" 
            value={formData.producto_id} 
            onChange={handleChange} 
            required
          >
            <option value="">Seleccione producto</option>
            {productos.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre} - ${p.precio}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Cantidad: </label>
          <input 
            type="number" 
            name="cantidad" 
            value={formData.cantidad} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Fecha: </label>
          <input 
            type="date" 
            name="fecha" 
            value={formData.fecha} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={onCerrar} style={{ marginLeft: '10px' }}>Cancelar</button>
      </form>
    </div>
  );
}

export default EditarVenta;