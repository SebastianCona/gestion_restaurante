import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = ({ nombre, text, detalle, children }) => (
  <BootstrapCard>
    <BootstrapCard.Body>
      <BootstrapCard.Title>{nombre}</BootstrapCard.Title>
      <BootstrapCard.Text>{text}</BootstrapCard.Text>
      <BootstrapCard.Text>{detalle}</BootstrapCard.Text>
      {children} {/* Esto permitirá que se inserte contenido como el botón */}
    </BootstrapCard.Body>
  </BootstrapCard>
);

export default Card;

