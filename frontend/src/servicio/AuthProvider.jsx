import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

const AuthProvider = ({ children }) => {
  const domain = "dev-33yg13m8rlpvug3f.us.auth0.com"; // Reemplaza con tu Domain de Auth0
  const clientId = "1qWGx2fkNYS7V5ujCZhzKLTGd7LoZHZd"; // Reemplaza con tu Client ID

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
