import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import getConfig from "../utils/getConfig";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { getConectionThunk } from "../store/slices/key.slice";

const Especialistas = () => {
  const [texto, setTexto] = useState("");

  const [especialistas, setEspecialistas] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, SetModalData] = useState({});

  const dispatch = useDispatch();

  const buscar = (e) => {
    e.preventDefault();
    const filter = {
      ProjectId: 2,
      Criteria: [
        {
          ComparisonOperatorId: 13,
          FieldName: "UserName",
          LogicOperatorId: 1,
          Value: texto,
        },
      ],
    };

    axios
      .post(
        "https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/user/list",
        filter,
        getConfig()
      )
      .then((res) => setEspecialistas(res.data.Data));
  };

  console.log(especialistas);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const active = [{ Field: "UserActive", Value: "1" }];

  const chgUsuario = () => {
    axios
      .post(
        `https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/user/${modalData.Id}/update`,
        active,
        getConfig()
      )
      .then((res) => {
        console.log(res.data);
        handleClose();
        // update()
      });
  };
  useEffect(() => {
    dispatch(getConectionThunk());
  }, []);

  return (
    <div>
      <h2>Habilitar Especialistas</h2>
      <form onSubmit={buscar}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-secondary">Buscar</button>
      </form>
      <div className="ul">
        {especialistas.map((especialista) => (
          <li key={especialista.Id}>
            <p>
              <strong>Nombre: </strong>
              {especialista.Name}
            </p>
            <p>
              <strong>Correo: </strong>
              {especialista.Email}
            </p>
            <p>
              <strong>Usuario: </strong>
              {especialista.UserName}
            </p>
            <Button
              variant="success"
              onClick={() => {
                handleShow();
                SetModalData(especialista);
              }}
            >
              Activar Especialista
            </Button>
          </li>
        ))}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nombre: {modalData.Name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Estas seguro de activar al usuario {modalData.UserName}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={chgUsuario}>
              Si
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Especialistas;
