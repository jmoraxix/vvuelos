import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import NavBar from "./NavBar";

import Login from "./login/login";
import logout from "./login/logout";
import Registro from "./components/registro.component";
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
import Reservacion from "./components/reservacion.component";
import Error from "./components/error.component";
import VueloDisponible from "./components/vuelosdisponibles.component";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={logout} />
            <Route exact path="/" component={Home} />
            <Route exact path="/usuarios" component={Usuario} />
            <Route exact path="/roles" component={RolUsuario} />
            <Route exact path="/vuelos" component={Vuelo} />
            <Route exact path="/aerolineas" component={Aerolinea} />
            <Route exact path="/paises" component={Pais} />
            <Route exact path="/puertas" component={Puerta} />
            <Route exact path="/estadosVuelos" component={EstadoVuelo} />
            <Route exact path="/reservaciones" component={Reservacion} />
            <Route exact path="/tiposPago" component={TipoPago} />
            <Route exact path="/bitacora" component={Bitacora} />
            <Route exact path="/clase" component={Clase} />
            <Route exact path="/accion" component={Accion} />
            <Route exact path="/consecutivo" component={Consecutivo} />
            <Route exact path="/registro" component={Registro} />
            <Route exact path="/erros" component={Error} />
            <Route exact path="/reservar" component={VueloDisponible} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;