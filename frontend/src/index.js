import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react"; // Proveedor de Auth0

const domain = "dev-33yg13m8rlpvug3f.us.auth0.com"; // Reemplaza con tu Domain de Auth0
const clientId = "1qWGx2fkNYS7V5ujCZhzKLTGd7LoZHZd"; // Reemplaza con tu Client ID

const AuthProvider = ({ children }) => (
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

reportWebVitals();
