import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./modulos/Home/Home";
import Inventario from "./modulos/inventario/Inventario";
import Menu from "./modulos/menu/Menu";
import Mesas from "./modulos/mesas/Mesas";
import CrearMesa from "./modulos/mesas/CrearMesa"; // Importar CrearMesa
import Pedidos from "./modulos/pedidos/Pedidos";
import MenuPage from "./modulos/carta/MenuPage";
import LoginPage from "./modulos/login/LoginPage";
import AsignarPedido from "./modulos/mesas/AsignarPedido";
const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          // Si no está autenticado, mostrar LoginPage
          <Route path="*" element={<LoginPage />} />
        ) : (
          // Si está autenticado, redirigir a las rutas de la app
          <>
            <Route path="/" element={<Home />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/mesas" element={<Mesas />} />
            <Route path="/asignar-pedido/:mesaId" element={<AsignarPedido />} /> {/* Ruta para asignar el pedido */}
            <Route path="/crear-mesa" element={<CrearMesa />} /> {/* Nueva ruta */}
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/carta" element={<MenuPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
