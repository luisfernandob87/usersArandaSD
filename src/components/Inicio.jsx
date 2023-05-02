import React from "react";
import iungo from "../img/iungo.png";
import delUsers from "../img/userX.svg";
import addUsers from "../img/userY.svg";
import { Link } from "react-router-dom";

const Inicio = () => {
  const copyright = new Date().getFullYear();

  return (
    <section>
      <div className="accesos">
        <img src={iungo} alt="logo_iungo" />
        <br />
        <Link to="home">
          <img src={delUsers} alt="UserDel" style={{ width: "70px" }} />
          <br />
        </Link>
        <p>Inactivar Especialistas Soporte Remoto</p>
        <Link to="mesadeayuda">
          <img src={delUsers} alt="UserDel" style={{ width: "70px" }} />
          <br />
        </Link>
        <p>Inactivar Especialistas Mesa de Ayuda</p>
        <Link to="especialistas">
          <img src={addUsers} alt="userAdd" style={{ width: "70px" }} />
        </Link>
        <p>Activar Especialistas</p>
      </div>
      <footer>
        <p>&#169; {copyright} - Todos los derechos reservados iUNGO</p>
      </footer>
    </section>
  );
};

export default Inicio;
