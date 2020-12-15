import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Home extends Component {


  componentDidMount() {
    this.validarSesion();
  }

  validarSesion =() => {
    if (!cookies.get('UsuarioID')) {
      this.props.history.push('/login');
    }
  };

  render() {
    return (
      <div className="jumbotron">
        Bienvenidos a vVuelos
      </div>
    );
  }
}