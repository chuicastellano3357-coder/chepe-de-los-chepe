import React from 'react';
import ListaVentas from './componentes/ListaVentas';
import FormularioVenta from './componentes/FormularioVenta';

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