import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./login/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

import SignIn from "./login/login";
import Registrarse from "./components/registrarse.component";
import Home from "./components/home.component";
import Usuario from "./components/usuario.component";
import RolUsuario from "./components/rolUsuario.component";
import Aerolinea from "./components/aerolinea.component";
import Pais from "./components/pais.component";
import Puerta from "./components/puerta.component";
import EstadoVuelo from "./components/estadoVuelo.component";
import TipoPago from "./components/tipoPago.component";
import Clase from "./components/clase.component";
import Accion from "./components/accion.component";
import Consecutivo from "./components/consecutivo.component";
import Vuelo from "./components/vuelo.component";
import Bitacora from "./components/bitacora.component";
import Reserva from "./components/reservacion.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <a href="/" className="navbar-brand">
            vVuelos
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/usuarios"} className="nav-link">
                Usuario
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/roles"} className="nav-link">
                Roles
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/vuelos"} className="nav-link">
                Vuelos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/aerolineas"} className="nav-link">
                Aerolineas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/paises"} className="nav-link">
                Paises
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/puertas"} className="nav-link">
                Puertas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/estadosVuelos"} className="nav-link">
                Estados de vuelos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/reservaciones"} className="nav-link">
                Reservaciones
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/tiposPago"} className="nav-link">
                Tipos de Pago
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/bitacora"} className="nav-link">
                Bitacora
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/clase"} className="nav-link">
                Clase
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/accion"} className="nav-link">
                Accion
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/consecutivo"} className="nav-link">
                Consecutivo
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/usuarios" component={Usuario} />
            <Route exact path="/roles" component={RolUsuario} />
            <Route exact path="/vuelos" component={Vuelo} />
            <Route exact path="/aerolineas" component={Aerolinea} />
            <Route exact path="/paises" component={Pais} />
            <Route exact path="/puertas" component={Puerta} />
            <Route exact path="/estadosVuelos" component={EstadoVuelo} />
            <Route exact path="/reservaciones" component={Reserva} />
            <Route exact path="/tiposPago" component={TipoPago} />
            <Route exact path="/bitacora" component={Bitacora} />
            <Route exact path="/clase" component={Clase} />
            <Route exact path="/accion" component={Accion} />
            <Route exact path="/consecutivo" component={Consecutivo} />
            <Route exact path="/registro" component={Registrarse} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;