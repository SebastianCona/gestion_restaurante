import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginPage.css";  // Importamos el archivo de estilos CSS

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Bienvenido al Sistema de Gestión de Restaurante</h1>
        <p className="login-description">
          Inicia sesión para gestionar el restaurante, administrar el inventario, el menú y más.
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="login-button"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
