import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePass = () => {
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = (navigate) => {
        if (!username || !currentPassword || !newPassword) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];

        const index = cuentas.findIndex(
            (cuenta) =>
                cuenta.username === username &&
                cuenta.password === currentPassword
        );

        if (index === -1) {
            alert('Usuario o contraseña actual incorrectos.');
            return;
        }

        // Cambiar contraseña
        cuentas[index].password = newPassword;
        localStorage.setItem('cuentas', JSON.stringify(cuentas));
        alert('Contraseña cambiada exitosamente.');
        navigate('/'); // o a donde quieras redirigir
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
                {/* Contenedor del título y botón */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '24px',
                    }}
                >
                    <h2
                        style={{
                            fontSize: '24px',
                            color: '#333',
                            margin: 0,
                        }}
                    >
                        Cambiar Contraseña
                    </h2>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            backgroundColor: '#f0f0f0',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            color: '#333',
                        }}
                    >
                        ⬅ Atrás
                    </button>
                </div>

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
                        placeholder="Contraseña actual"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleChangePassword}
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
                        Guardar nueva contraseña
                    </button>
                </form>
            </div>
        </div>
    );

};

export default ChangePass;
