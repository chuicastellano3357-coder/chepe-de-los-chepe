import React from 'react';
import axios from 'axios';
import ListaVentas from './componentes/ListaVentas';
import FormularioVenta from './componentes/FormularioVenta';

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

function App() {
  return (
    <div>
      <h1>Cafetería Escolar</h1>
      <FormularioVenta />
      <ListaVentas />
    </div>
  );
}

export default App;