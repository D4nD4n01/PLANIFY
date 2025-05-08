import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Principal = () => {
  const navigate = useNavigate();
  const userID = localStorage.getItem('UserID');
  const [userTipo, setUserTipo] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    const cuenta = cuentas.find((c) => c.id === userID);
    if (cuenta) {
      setUserTipo(Number(cuenta.tipo));
    }
  }, [userID]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    if (!userID || userTipo === null) return;
  
    if (userTipo === 1) {
      // Validación para usuarios
      if (!formData.nombre || !formData.fechaNacimiento) {
        alert("Faltan por ingresar Datos");
        return;
      }
    } else {
      // Validación para empresas
      if (!formData.nombreLocal || !formData.direccion || !formData.coordenadas) {
        alert("Faltan por ingresar Datos");
        return;
      }
    }
  
    const key = userTipo === 1 ? 'datosUsuarios' : 'datosEmpresa';
    const idKey = userTipo === 1 ? 'idUsuario' : 'idEmpresa';
  
    const datos = JSON.parse(localStorage.getItem(key)) || {};
  
    // ✅ Agregar el ID dentro del objeto guardado
    const datosConID = {
      ...formData,
      [idKey]: userID,
    };
  
    datos[userID] = datosConID;
    localStorage.setItem(key, JSON.stringify(datos));
  
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    const index = cuentas.findIndex((cuenta) => cuenta.id === userID);
  
    if (index !== -1) {
      cuentas[index].addData = true;
      localStorage.setItem('cuentas', JSON.stringify(cuentas));
    }
  
    navigate('/menu');
  };
  

  const handleLogout = () => {
    localStorage.removeItem('UserID');
    navigate('/');
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Completa tu información</h2>

        {userTipo === 1 ? (
          <>
            <label style={labelStyle}>Nombre completo:</label>
            <input type="text" name="nombre" onChange={handleChange} style={inputStyle} />

            <label style={labelStyle}>Fecha de nacimiento:</label>
            <input type="date" name="fechaNacimiento" onChange={handleChange} style={inputStyle} />

            <label style={labelStyle}>
              <input type="checkbox" name="mayorEdad" onChange={handleChange} style={{ marginRight: '8px' }} />
              ¿Es mayor de edad?
            </label>
          </>
        ) : userTipo === 2 ? (
          <>
            <label style={labelStyle}>Nombre del local:</label>
            <input type="text" name="nombreLocal" onChange={handleChange} style={inputStyle} />

            <label style={labelStyle}>Dirección:</label>
            <input type="text" name="direccion" onChange={handleChange} style={inputStyle} />

            <label style={labelStyle}>Coordenadas (lat,long):</label>
            <input type="text" name="coordenadas" onChange={handleChange} style={inputStyle} />
          </>
        ) : (
          <p style={{ color: '#333' }}>Cargando tipo de usuario...</p>
        )}

        <div style={{ marginTop: '20px' }}>
          <button onClick={handleSave} style={btnStyle}>Guardar y continuar</button>
          <button onClick={handleLogout} style={logoutBtnStyle}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

// Estilos
const wrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: 'linear-gradient(to right, #FFDEE9, #B5FFFC)',
};

const containerStyle = {
  backgroundColor: '#fff',
  padding: '40px 30px',
  borderRadius: '12px',
  boxShadow: '0px 8px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '500px',
  textAlign: 'left',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  marginTop: '16px',
  color: '#333',
  fontSize: '16px',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
  marginBottom: '10px',
};

const btnStyle = {
  padding: '12px 20px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  marginRight: '10px',
};

const logoutBtnStyle = {
  ...btnStyle,
  backgroundColor: '#f44336',
};

export default Principal;
