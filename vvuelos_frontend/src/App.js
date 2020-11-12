import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

import Home from "./components/home.component";
// import AddTutorial from "./components/tutorial/add-tutorial.component";
// import Tutorial from "./components/tutorial.component";
// import TutorialsList from "./components/tutorials-list.component";
// import Usuario from "./components/usuario.component";
import RolUsuario from "./components/rolUsuario.component";

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
              <Link to={"/usuario"} className="nav-link">
                Usuario
              </Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link to={"/usuario"} className="dropdown-item">
                  Usuario
                </Link>
                <Link to={"/roles"} className="dropdown-item">
                  Roles
                </Link>
              </div>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            {/* <Route exact path={["/", "/tutorials"]} component={TutorialsList} /> */}
            <Route exact path="/home" component={Home} />
            {/* <Route exact path="/usuario" component={Usuario} /> */}
            <Route exact path="/roles" component={RolUsuario} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;