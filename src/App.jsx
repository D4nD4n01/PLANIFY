import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Router y las rutas
import InicioSesion from './comp/login/InicioSesion';
import Registrarse from './comp/login/Registrarse';
import Menu from './comp/menu/menu';
import Principal from './comp/menu/principal';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChangePass from './comp/login/changePass';


const App = () => {
  
  /*const menu = [
    {
      strName: "Mapa",
      id: 1,
      type: 1
    },
    {
      strName: "Citas",
      id: 3,
      type: 1
    },
    {
      strName: "Citas",
      id: 4,
      type: 2
    }
  ];
  
  localStorage.setItem('menu', JSON.stringify(menu));*/
  

  return (
    <Router> 
      <Routes>
        <Route path="/" element={<InicioSesion />} /> 
        <Route path="/registrarse" element={<Registrarse />} /> 
        <Route path="/menu" element={<Menu />} /> 
        <Route path="/principal" element={<Principal />} /> 
        <Route path="/changePass" element={<ChangePass/>} />
      </Routes>
    </Router>
  );
};

export default App;