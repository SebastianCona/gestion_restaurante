// MenuCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const MenuCard = ({ menu, onEdit, onDelete }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{menu.nombre_plato}</Card.Title>
        <Card.Text>
          <strong>Precio: </strong>${menu.precio}
        </Card.Text>
        <Button variant="warning" onClick={() => onEdit(menu)}>
          Editar
        </Button>
        <Button variant="danger" onClick={() => onDelete(menu.id)}>
          Eliminar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MenuCard;
