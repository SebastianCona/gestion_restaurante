import React, { useEffect, useState } from "react";
import { get, post, remove } from "../../servicio/axios";
import Card from "../../componentes/Card";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Mesas.css";

const Mesas = () => {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener las mesas y el menú al cargar el componente
    const fetchData = async () => {
      try {
        const mesasResponse = await get("mesas/");
        const menuResponse = await get("menu/");
        
        // Ordenar las mesas de menor a mayor por el número de mesa
        const mesasOrdenadas = mesasResponse.sort((a, b) => a.numero_mesa - b.numero_mesa);
        setData(mesasOrdenadas);
        setMenu(menuResponse);  // Almacenar los platos del menú
      } catch (error) {
        console.error("Error al obtener las mesas o el menú:", error);
      }
    };

    fetchData();
  }, []);

  // Función para eliminar una mesa
  const handleEliminarMesa = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar esta mesa?");
    if (confirmacion) {
      try {
        await remove(`mesas/${id}/`);
        setData(data.filter((mesa) => mesa.id !== id)); // Eliminar la mesa de la lista local
        alert("Mesa eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar la mesa:", error);
        alert("No se pudo eliminar la mesa");
      }
    }
  };

  // Función para asignar un pedido a una mesa
  const handleAsignarPedido = (mesaId) => {
    // Navegar a una nueva vista donde puedes seleccionar los platos del menú
    navigate(`/asignar-pedido/${mesaId}`);
  };

  return (
    <div className="mesas-page">
      <Container>
        <div style={{ marginBottom: "20px" }}>
          <Button variant="secondary" onClick={() => navigate("/")} style={{ marginRight: "10px" }}>
            Volver
          </Button>
          <Button variant="success" onClick={() => navigate("/crear-mesa")} style={{ marginRight: "10px" }}>
            Agregar Mesa
          </Button>
        </div>
        <Row>
          {data.map((mesa) => (
            <Col md={4} key={mesa.id}>
              <Card
                text={`Capacidad: ${mesa.capacidad}`}
                nombre={`Mesa: ${mesa.numero_mesa}`}
                detalle={`Estado: ${mesa.estado}`}
              >
                <Button variant="primary" onClick={() => handleAsignarPedido(mesa.id)} style={{ marginTop: "10px" }}>
                  Asignar Pedido
                </Button>
                <Button variant="danger" onClick={() => handleEliminarMesa(mesa.id)} style={{ marginTop: "10px", backgroundColor: "red", borderColor: "red" }}>
                  Eliminar Mesa
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Mesas;
