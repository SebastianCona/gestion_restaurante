import React, { useState } from 'react';
import './Login.css'; // Asegúrate de crear este archivo para los estilos personalizados

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí ponemos un usuario y contraseña de prueba (como si fuera un login falso)
        const validUsername = 'admin';
        const validPassword = '12345';

        // Verificamos si el usuario y contraseña son correctos
        if (username === validUsername && password === validPassword) {
            alert('Login exitoso');
            // Aquí podrías redirigir al usuario a otra página, por ejemplo
            // window.location.href = '/dashboard';
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ingrese su nombre de usuario"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese su contraseña"
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {error && <p className="text-danger text-center mt-3">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
