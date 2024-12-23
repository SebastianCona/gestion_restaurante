import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import Menu from "../modulos/menu/Menu";
import Pedidos from "../modulos/pedidos/Pedidos";
import { Card, Container, Stack } from "react-bootstrap";
import { get } from "../servicio/axios";
import "./Componentes.css";

const Modalcomp = ({
  show,
  handleClose,
  data,
  toDo,
  listMenu,
  setListMenu,
  header,
  setRefresh,
}) => {
  const [mesaDisponible, setMesaDisponible] = useState(false);
  const [pedidoEnCurso, setPedidoEnCurso] = useState(
    data.pedidoencurso !== null
  );
  const [dataPedido, setDataPedido] = useState({});

  const getPedidoEnCurso = async () => {
    if (data.pedidoencurso !== null && data.pedidoencurso !== 0) {
      const response = await get(`pedidos/${data.pedidoencurso}`);
      setDataPedido(response);
    }
  };

  useEffect(() => {
    setMesaDisponible(data?.estado === "disponible");
  }, [data]);

  useEffect(() => {
    show && getPedidoEnCurso();
  }, [show]);

  useEffect(() => {
    pedidoEnCurso && getPedidoEnCurso();
  }, [pedidoEnCurso]);

  return (
    <>
      <Modal show={show} size={"xl"} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>
            Mesa: {data.numero_mesa} {header}
          </Modal.Title>
        </Modal.Header>
        {data && (
          <>
            <Modal.Body>
              La mesa {data.numero_mesa} se encuentra {data.estado}
            </Modal.Body>
            <Button
              variant="primary"
              onClick={
                !mesaDisponible
                  ? () => {
                      toDo("disponible", null);
                      setPedidoEnCurso(false);
                    }
                  : () => {
                      toDo("ocupada", null);
                      setPedidoEnCurso(false);
                    }
              }
            >
              {mesaDisponible ? "Asignar mesa" : "Desocupar mesa"}
            </Button>
          </>
        )}
        <Container>
          {pedidoEnCurso && !mesaDisponible ? (
            <Stack direction="horizontal">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Estado Pedido: {dataPedido?.estado}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Total Pedido: ${parseInt(dataPedido?.total)}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Stack>
          ) : (
            !mesaDisponible && (
              <Stack direction="horizontal">
                <Menu listMenu={listMenu} setListMenu={setListMenu} />
                <Pedidos
                  idMesa={data.id}
                  listMenu={listMenu}
                  setListMenu={setListMenu}
                  dataMesa={data}
                  setPedidoEnCurso={setPedidoEnCurso}
                  setRefresh={setRefresh}
                  handleClose={handleClose}
                />
              </Stack>
            )
          )}
        </Container>
      </Modal>
    </>
  );
};

export default Modalcomp;
