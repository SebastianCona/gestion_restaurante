import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Home.css'; 
import { useAuth0 } from "@auth0/auth0-react";



const Home = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin }); // Redirige al LoginPage
  };

  return (
    <div className="home-container">
      
      
      <Container className="text-center">
        <h1 className="home-title mb-4">Gestión del Restaurante</h1>
        
        <button
          onClick={handleLogout}
          className="logout-button"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Cerrar Sesión
        </button>
        <Row className="justify-content-center">
          <Col md={3} sm={6} className="mb-3">
            <Link to="/inventario" style={{ textDecoration: 'none' }}>
              <Card className="home-card">
                <Card.Body>
                  <Card.Title>Inventario</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Link to="/menu" style={{ textDecoration: 'none' }}>
              <Card className="home-card">
                <Card.Body>
                  <Card.Title>Menú</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Link to="/mesas" style={{ textDecoration: 'none' }}>
              <Card className="home-card">
                <Card.Body>
                  <Card.Title>Mesas</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Link to="/carta" style={{ textDecoration: 'none' }}>
              <Card className="home-card">
                <Card.Body>
                  <Card.Title>Carta</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          
          
        </Row>
      </Container>
    </div>
  );
};

export default Home;
