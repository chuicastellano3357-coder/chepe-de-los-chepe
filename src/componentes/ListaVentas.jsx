import React, { useEffect, useState } from 'react';
import API from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  // Cargar lista de ventas desde la API (GET)
  const cargarVentas = () => {
    API.get('/ventas')
      .then(res => setVentas(res.data))
      .catch(err => console.error('Error al obtener ventas:', err));
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  // Función para eliminar directamente sin cuadro de confirmación
  const eliminarVenta = (id) => {
    API.delete(`/ventas/${id}`)
      .then(() => {
        cargarVentas(); // Refrescar la tabla al instante
      })
      .catch(err => console.error('Error al eliminar venta:', err));
  };

  return (
    <div>
      <h2>Ventas de la Cafetería</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.estudiante}</td>
              <td>{v.producto}</td>
              <td>{v.cantidad}</td>
              <td>${v.precio}</td>
              <td>${v.total}</td>
              <td>{v.fecha ? v.fecha.split('T')[0] : ''}</td>
              <td>
                <button 
                  onClick={() => setVentaSeleccionada(v)} 
                  style={{ marginRight: '8px' }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => eliminarVenta(v.id)}
                  style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ventaSeleccionada && (
        <EditarVenta 
          venta={ventaSeleccionada} 
          onCerrar={() => setVentaSeleccionada(null)} 
          onVentaActualizada={cargarVentas} 
        />
      )}
    </div>
  );
}

export default ListaVentas;