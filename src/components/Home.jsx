import axios from "axios";
import React, { useEffect, useState } from "react";
import getConfig from "../utils/getConfig";
import { useDispatch } from "react-redux";
import { getConectionThunk } from "../store/slices/key.slice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Home = () => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const list = [
    {
      ComparisonOperatorId: 13,
      FieldName: "USER_ACTIVE",
      LogicOperatorId: 0,
      Value: "1",
    },
    {
      ComparisonOperatorId: 13,
      FieldName: "CodDepto",
      LogicOperatorId: 1,
      Value: "206",
    },
  ];

  useEffect(() => {
    dispatch(getConectionThunk());
    axios
      .post(
        "https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/user/listall",
        list,
        getConfig()
      )
      .then((res) => setUsers(res.data));
  }, []);

  const [show, setShow] = useState(false);
  const [modalData, SetModalData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const inactive = [{ Field: "UserActive", Value: "0" }];

  const update = () => {
    axios
      .post(
        "https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/user/listall",
        list,
        getConfig()
      )
      .then((res) => setUsers(res.data));
  };

  const chgUsuario = () => {
    axios
      .post(
        `https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/user/${modalData.Id}/update`,
        inactive,
        getConfig()
      )
      .then((res) => {
        console.log(res.data);
        handleClose();
        update();
      });
  };

  return (
    <div>
      <h2>Usuarios Activos de Soporte Remoto</h2>
      <div className="ul">
        {users.map((user) => (
          <li key={user.Id}>
            <p>
              <strong>Nombre: </strong>
              {user.Name}
            </p>
            <p>
              <strong>Correo: </strong>
              {user.Email}
            </p>
            <p>
              <strong>Usuario: </strong>
              {user.UserName}
            </p>
            <Button
              variant="danger"
              onClick={() => {
                handleShow();
                SetModalData(user);
              }}
            >
              Inactivar Especialista
            </Button>
          </li>
        ))}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nombre: {modalData.Name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Estas seguro de inactivar al usuario {modalData.UserName}?
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

export default Home;
