// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa la aplicación principal

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Ya no es necesario envolverlo en BrowserRouter aquí */}
  </React.StrictMode>
);
