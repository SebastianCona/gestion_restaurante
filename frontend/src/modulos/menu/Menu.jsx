import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Form, Modal } from "react-bootstrap";
import { get, post, remove, put } from "../../servicio/axios";
import { Link } from "react-router-dom";
import './Menu.css'; // Importa el archivo CSS

const Menu = ({ listMenu, setListMenu }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    nombre_plato: "",
    precio: 0,
    descripcion: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  const addMenuItem = (menu) => {
    setListMenu((prevState) => [...prevState, menu]);
  };

  const getMenu = async () => {
    try {
      const response = await get("menu/");
      setData(response);
    } catch (error) {
      console.error("Error al obtener el menú:", error);
    } finally {
      setLoading(false);
    }
  };

  const createMenuItem = async () => {
    try {
      const response = await post("menu/", newMenuItem);
      setData((prevData) => [...prevData, response]);
      setShowModal(false);
    } catch (error) {
      console.error("Error al agregar el plato:", error);
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await remove(`menu/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar el plato:", error);
    }
  };

  const updateMenuItem = async () => {
    try {
      const response = await put(`menu/${editingItemId}/`, newMenuItem);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingItemId ? { ...item, ...newMenuItem } : item
        )
      );
      setShowModal(false);
      setEditMode(false);
      setEditingItemId(null);
    } catch (error) {
      console.error("Error al actualizar el plato:", error);
    }
  };

  useEffect(() => {
    if (data === null) {
      getMenu();
    }
  }, [data]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  const handleEdit = (menu) => {
    setNewMenuItem({
      nombre_plato: menu.nombre_plato,
      precio: menu.precio,
      descripcion: menu.descripcion,
    });
    setEditingItemId(menu.id);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="menu-container">
      <Link to="/" className="menu-link-button mb-3">
        Volver
      </Link>
      <Button variant="success" onClick={() => setShowModal(true)} className="menu-button">
        Agregar Nuevo Plato
      </Button>

      <Row className="menu-row">
        {data &&
          data.map((menu) => (
            <Col xs={12} sm={6} md={4} lg={3} key={menu.id} className="menu-mb-4">
              <Card className="menu-card">
                <Card.Body>
                  <Card.Title className="menu-card-title">{menu.nombre_plato}</Card.Title>
                  <Card.Text className="menu-card-text">
                    <strong>Precio: </strong>${menu.precio}
                  </Card.Text>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(menu)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteMenuItem(menu.id)}
                  >
                    Eliminar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Editar Plato" : "Agregar Plato"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombrePlato">
              <Form.Label>Nombre del Plato</Form.Label>
              <Form.Control
                type="text"
                value={newMenuItem.nombre_plato}
                onChange={(e) =>
                  setNewMenuItem({ ...newMenuItem, nombre_plato: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={newMenuItem.precio}
                onChange={(e) =>
                  setNewMenuItem({ ...newMenuItem, precio: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newMenuItem.descripcion}
                onChange={(e) =>
                  setNewMenuItem({
                    ...newMenuItem,
                    descripcion: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={editMode ? updateMenuItem : createMenuItem}
          >
            {editMode ? "Actualizar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menu;
