import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios"; 
import "./Inventario.css";

const Inventario = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/inventario/");
      setData(response.data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    }
  };

  const handleShow = (item = {}) => {
    setSelectedItem(item);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedItem({});
  };

  const handleSave = async () => {
    const { id } = selectedItem;
    try {
      if (id) {
        // Editar el producto
        await axios.put(`http://localhost:8000/api/inventario/${id}/`, selectedItem);
        alert("Producto actualizado");
      } else {
        // Crear un nuevo producto
        await axios.post("http://localhost:8000/api/inventario/", selectedItem);
        alert("Producto creado");
      }
      fetchData(); // Refrescar la lista de productos
      handleClose();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/inventario/${id}/`);
      alert("Producto eliminado");
      fetchData(); // Refrescar la lista de productos después de eliminar
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Cargar productos al montar el componente
  }, []);

  const handleChange = (field, value) => {
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="inventario-container">
        <div className="d-flex align-items-center mb-3">
          <Link to="/" className="inventario-link-button mb-3">Volver</Link>
          <Button variant="success" onClick={() => handleShow()} className="inventario-btn-success ms-3">
            Agregar Producto
          </Button>
        </div>
        <Table striped bordered hover responsive className="inventario-table-custom">
          <thead className="inventario-table-header">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Precio</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, nombre_producto, descripcion, cantidad, unidad_medida, precio }) => (
              <tr key={id} className="inventario-table-row">
                <td>{nombre_producto}</td>
                <td>{descripcion}</td>
                <td>{cantidad}</td>
                <td>{unidad_medida}</td>
                <td>${precio}</td>
                <td>
                  <Button variant="warning" onClick={() => handleShow({ id, nombre_producto, descripcion, cantidad, unidad_medida, precio })} className="inventario-btn-warning me-2">
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(id)} className="inventario-btn-danger">
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose} className="inventario-modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem.id ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {['nombre_producto', 'descripcion', 'cantidad', 'unidad_medida', 'precio'].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field.replace('_', ' ').toUpperCase()}</Form.Label>
                {field === 'descripcion' ? (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={selectedItem[field] || ''}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="inventario-form-control-custom"
                  />
                ) : field === 'unidad_medida' ? (
                  <Form.Select
                    value={selectedItem[field] || ''}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="inventario-form-control-custom"
                  >
                    <option value="">Seleccionar</option>
                    <option value="kg">Kilogramo</option>
                    <option value="litro">Litro</option>
                    <option value="unidad">Unidad</option>
                    <option value="gramo">Gramo</option>
                    <option value="ml">Mililitro</option>
                  </Form.Select>
                ) : (
                  <Form.Control
                    type={field === 'precio' || field === 'cantidad' ? 'number' : 'text'}
                    value={selectedItem[field] || ''}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="inventario-form-control-custom"
                  />
                )}
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Inventario;
