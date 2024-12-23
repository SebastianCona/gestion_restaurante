import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'; 
import './CrearMesa.css';

function CrearMesa() {
    const [numeroMesa, setNumeroMesa] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [estado, setEstado] = useState('disponible');
    const navigate = useNavigate();

    const agregarMesa = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/mesas/', {
                numero_mesa: numeroMesa,
                capacidad: capacidad,
                estado: estado,
            });
            console.log('Mesa creada:', response.data);
            alert('Mesa creada con éxito');
            navigate('/mesas');
        } catch (error) {
            console.error('Error al agregar la mesa:', error.response ? error.response.data : error.message);
            alert('Error al crear la mesa');
        }
    };

    return (
        <Container className="crear-mesa-container mt-5">
            <h2 className="text-center mb-4">Crear Nueva Mesa</h2>
            <Form>
                <Row className="mb-3">
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="formNumeroMesa">
                            <Form.Label className="form-label">Número de Mesa</Form.Label>
                            <Form.Control
                                className="form-control"
                                type="number"
                                placeholder="Ingrese el número de mesa"
                                value={numeroMesa}
                                onChange={(e) => setNumeroMesa(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="formCapacidad">
                            <Form.Label className="form-label">Capacidad</Form.Label>
                            <Form.Control
                                className="form-control"
                                type="number"
                                placeholder="Capacidad de la mesa"
                                value={capacidad}
                                onChange={(e) => setCapacidad(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="formEstado">
                            <Form.Label className="form-label">Estado</Form.Label>
                            <Form.Control
                                className="form-control"
                                as="select"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="disponible">Disponible</option>
                                <option value="ocupada">Ocupada</option>
                                <option value="preparando">Preparando</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center">
                    <Button
                        variant="success"
                        onClick={agregarMesa}
                        className="success"
                    >
                        Crear Mesa
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default CrearMesa;
