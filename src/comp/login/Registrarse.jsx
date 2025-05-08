// Registrarse.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegación

const Registrarse = () => {
  const navigate = useNavigate(); // Para navegar a otra página
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('1'); // 1: Usuario, 2: Empresa
  const [error, setError] = useState('');

  const generateId = () => {
    // Generar un ID único simple (esto podría ser más complejo si lo necesitas)
    return 'id_' + Date.now();
  };

  const handleRegister = () => {
    setError(null)
    // Validar que todos los campos estén llenos
    if (!username || !password || !tipo) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    let addData = false
    // Generar un ID para la cuenta
    const id = generateId();
    const cuenta = { id, username, password, tipo,addData};

    // Obtener las cuentas del localStorage
    let cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];

    // Verificar si la cuenta con el mismo username ya existe
    const cuentaExistente = cuentas.find((cuenta) => cuenta.username === username);

    if (cuentaExistente) {
      // Si ya existe la cuenta, mostrar un alerta
      alert('El nombre de usuario ya existe. Por favor, elige otro.');
      return;
    }

    // Si no existe, agregamos la nueva cuenta a la lista
    cuentas.push(cuenta);

    // Guardar las cuentas en el localStorage
    localStorage.setItem('cuentas', JSON.stringify(cuentas));

    // Redirigir a la página de inicio de sesión
    navigate('/'); // Redirige a la página de inicio de sesión
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #FFDEE9, #B5FFFC)',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '40px 30px',
          borderRadius: '12px',
          boxShadow: '0px 8px 20px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            marginBottom: '24px',
            fontSize: '28px',
            color: '#333',
          }}
        >
          Registrarse
        </h2>

        {error && (
          <div
            style={{
              color: 'red',
              marginBottom: '20px',
            }}
          >
            {error}
          </div>
        )}

        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            <option value="1">Usuario</option>
            <option value="2">Empresa</option>
          </select>
          <button
            type="button"
            onClick={handleRegister}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#2196F3',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;
