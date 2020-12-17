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
import Rol from "./components/rol.component";
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
import ReservacionesUsuario from "./components/vuelosdisponibles.component";
import RolUsuario from "./components/rolUsuario.component";


class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={logout} />
            <Route exact path="/registro" component={Registro} />
            <Route exact path="/" component={Home} />
            <Route exact path="/reservar" component={VueloDisponible} />
            <Route exact path="/misReservaciones" component={ReservacionesUsuario} />
            <Route exact path="/admin/usuarios" component={Usuario} />
            <Route exact path="/admin/roles" component={Rol} />
            <Route exact path="/admin/vuelos" component={Vuelo} />
            <Route exact path="/admin/aerolineas" component={Aerolinea} />
            <Route exact path="/admin/paises" component={Pais} />
            <Route exact path="/admin/puertas" component={Puerta} />
            <Route exact path="/admin/estadosVuelos" component={EstadoVuelo} />
            <Route exact path="/admin/reservaciones" component={Reservacion} />
            <Route exact path="/admin/tiposPago" component={TipoPago} />
            <Route exact path="/admin/bitacoras" component={Bitacora} />
            <Route exact path="/admin/clase" component={Clase} />
            <Route exact path="/admin/accion" component={Accion} />
            <Route exact path="/admin/consecutivo" component={Consecutivo} />
            <Route exact path="/admin/error" component={Error} />
            <Route exact path="/admin/usuarios/roles" component={RolUsuario} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;