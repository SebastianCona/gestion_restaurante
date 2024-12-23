import React, { useState, useEffect } from "react";
import { get, post } from "../../servicio/axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, ListGroup } from "react-bootstrap";

const AsignarPedido = () => {
  const { mesaId } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [selectedPlates, setSelectedPlates] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await get("menu/");
        setMenu(response);
      } catch (error) {
        console.error("Error al obtener el menú:", error);
      }
    };
    fetchMenu();
  }, []);

  // Actualiza la lista de platos seleccionados y calcula el total
  const handleSelectPlate = (plate) => {
    const newSelectedPlates = [...selectedPlates];
    const plateIndex = newSelectedPlates.findIndex((item) => item.id === plate.id);

    if (plateIndex === -1) {
      newSelectedPlates.push(plate);
    } else {
      newSelectedPlates.splice(plateIndex, 1);
    }

    setSelectedPlates(newSelectedPlates);

    // Calcular el total
    const newTotal = newSelectedPlates.reduce((sum, plate) => sum + plate.precio, 0);
    setTotal(newTotal);
  };

  // Función para asignar el pedido a la mesa
  const handleAssignOrder = async () => {
    const order = {
      mesa_id: mesaId,
      platos: selectedPlates.map((plate) => plate.id),
      total: total,
    };

    try {
      await post("pedidos/", order); // Crear el pedido en el backend
      alert("Pedido asignado correctamente");
      navigate("/mesas"); // Volver a la vista de mesas
    } catch (error) {
      console.error("Error al asignar el pedido:", error);
      alert("No se pudo asignar el pedido");
    }
  };

  return (
    <div className="asignar-pedido">
      <h2>Asignar Pedido a la Mesa {mesaId}</h2>
      <h3>Seleccionar Platos</h3>
      <ListGroup>
        {menu.map((plate) => (
          <ListGroup.Item key={plate.id}>
            <Form.Check
              type="checkbox"
              label={`${plate.nombre_plato} - $${plate.precio}`}
              onChange={() => handleSelectPlate(plate)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h3>Total: ${total}</h3>
      <Button variant="success" onClick={handleAssignOrder}>
        Asignar Pedido
      </Button>
    </div>
  );
};

export default AsignarPedido;
