import React, { useState, useEffect } from "react";
import { get } from "../../servicio/axios";
import { Container, ListGroup, Spinner, Card } from "react-bootstrap";
import './MenuPage.css'; // Importamos el archivo CSS

const MenuPage = () => {
  const [menu, setMenu] = useState([]); // Aseguramos que el estado inicial sea un array
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const response = await get("menu/"); // Endpoint para obtener el menú
      setMenu(response); // Suponiendo que la respuesta sea un array de platos
    } catch (error) {
      console.error("Error al cargar el menú:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Menú</h1>
      {loading ? (
        <div className="spinner-container text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <ListGroup>
          {menu.length > 0 ? (
            menu.map((plato) => (
              <ListGroup.Item key={plato.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{plato.nombre}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Precio: ${plato.precio}
                    </Card.Subtitle>
                    <Card.Text>{plato.descripcion}</Card.Text>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))
          ) : (
            <div className="no-menu-message">
              No hay platos disponibles en el menú.
            </div>
          )}
        </ListGroup>
      )}
    </Container>
  );
};

export default MenuPage;
