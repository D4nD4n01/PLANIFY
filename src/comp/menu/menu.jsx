import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mapa from './map';
import Citas from './citas';
import Datos from './datos';

const Menu = () => {
  const navigate = useNavigate();
  const [opcionesMenu, setOpcionesMenu] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  useEffect(() => {
    const userID = localStorage.getItem('UserID');
    if (!userID) {
      navigate('/');
      return;
    }

    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    const usuario = cuentas.find((cuenta) => cuenta.id.toString() === userID);

    const menuGuardado = JSON.parse(localStorage.getItem('menu')) || [];
    const opcionesFiltradas = usuario
      ? menuGuardado.filter(opcion => Number(opcion.type) === Number(usuario.tipo))
      : menuGuardado;

    setOpcionesMenu(opcionesFiltradas);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('UserID');
    navigate('/');
  };

  const handleSelectOption = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  const renderizarContenido = () => {
    if (!opcionSeleccionada) {
      return <h2 style={{ color: '#999' }}>Selecciona una opción del menú</h2>;
    }

    switch (opcionSeleccionada.strName) {
      case 'Mapa':
        return (
          <div style={{ height: '80vh' }}>
            <Mapa />
          </div>
        );
      case 'Citas':
        return <Citas />;
      case 'Datos':
        return <Datos />;
      default:
        return (
          <h2 style={{ color: '#333' }}>
            Has seleccionado: {opcionSeleccionada.strName}
          </h2>
        );
    }
  };


  return (
    <div style={{ display: 'flex', height: '97vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#ECEFF1' }}>

      {/* Menú lateral */}
      <div
        style={{
          width: '200px',
          background: 'linear-gradient(180deg, #42A5F5 0%, #1E88E5 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '20px',
          gap: '10px',
          boxShadow: '3px 0 8px rgba(0,0,0,0.15)',
          borderTopRightRadius: '12px',
          borderBottomRightRadius: '12px'
        }}
      >
        <h3 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: 'bold' }}>Menú</h3>

        <div style={{ width: '100%' }}>
          {opcionesMenu.length > 0 ? (
            opcionesMenu.map((opcion) => (
              <button
                key={opcion.id}
                onClick={() => handleSelectOption(opcion)}
                style={{
                  width: '90%',
                  margin: '8px auto',
                  padding: '10px 15px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#64B5F6',
                  color: 'white',
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'block',
                  transition: '0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#90CAF9')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#64B5F6')}
              >
                {opcion.strName}
              </button>
            ))
          ) : (
            <p style={{ fontSize: '14px', padding: '10px', textAlign: 'center' }}>
              No hay opciones disponibles.
            </p>
          )}
        </div>

        {/* Botón de Cerrar Sesión */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            marginBottom: '20px',
            width: '80%',
            padding: '10px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#EF5350',
            color: 'white',
            fontSize: '15px',
            cursor: 'pointer',
            transition: '0.3s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#E57373')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#EF5350')}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div style={{ flex: 1, padding: '30px', backgroundColor: '#f5f5f5' }}>
        {renderizarContenido()}
      </div>
    </div>
  );
};

export default Menu;
