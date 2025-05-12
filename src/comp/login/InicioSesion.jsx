// InicioSesion.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InicioSesion = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [intentos, setIntentos] = useState(0)

  // Efecto que se ejecuta apenas cargas la pantalla
  useEffect(() => {
    const userID = localStorage.getItem('UserID');
    if (userID) {
      // Buscar en las cuentas el usuario correspondiente
      const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
      const usuario = cuentas.find((cuenta) => cuenta.id === userID);

      if (usuario) {
        validacion(usuario)
      } 
    }
  }, []);

  const validacion = (usuario) => {
    localStorage.setItem('UserID', usuario.id);
    if (usuario.addData) {
      setIntentos(0)
      navigate('/menu');
    } else {
      setIntentos(0)
      navigate('/principal');
    }
  };

  const changePass = (attempt) => {
    setIntentos(attempt)
    if(attempt == 3){
      localStorage.setItem('change', JSON.stringify(username));
      navigate('/changePass')
    } 
  }

  const handleLogin = () => {
    if (!username || !password) {
      alert('Por favor, llena todos los campos');
      return;
    }

    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];

    const usuario = cuentas.find(
      (cuenta) => cuenta.username === username && cuenta.password === password
    );

    if (usuario) {
      validacion(usuario);
    } else {
      let cambiar = cuentas.find((cuenta) => cuenta.username === username );
      if(cambiar){
        changePass(intentos + 1)
        alert('Contraseña incorrecta');
      } else {
        alert("Usuario incorrecto")
      }
      
    }
  };

  const handleUsuario = (e) => {
    setUsername(e.target.value)
    changePass(0)
  }


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
          Iniciar Sesión
        </h2>
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
            onChange={handleUsuario}
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
          <button
            type="button"
            onClick={handleLogin}
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
            Iniciar Sesión
          </button>
        </form>

        {/* Enlace a la página de Registro */}
        <div
          style={{
            marginTop: '20px',
            fontSize: '16px',
            color: '#333',
          }}
        >
          <p>
            ¿No tienes cuenta?{' '}
            <span
              style={{
                color: '#2196F3',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => navigate('/registrarse')}
            >
              Regístrate aquí
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
