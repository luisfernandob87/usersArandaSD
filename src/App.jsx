import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Especialistas from "./components/Especialistas";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./components/Inicio";
import MesaDeAyuda from "./components/MesaDeAyuda";

function App() {
  const rutaServidor = "/"; //Localhost
  // const rutaServidor = "/especialistas"; //Servidor

  return (
    <HashRouter>
      <Routes>
        <Route path={rutaServidor} element={<Inicio />} />
        <Route
          path={rutaServidor + "/especialistas/"}
          element={<Especialistas />}
        />
        <Route path={rutaServidor + "/home/"} element={<Home />} />
        <Route
          path={rutaServidor + "/mesadeayuda/"}
          element={<MesaDeAyuda />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
