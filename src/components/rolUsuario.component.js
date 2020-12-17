import React, { Component } from "react";
import RolDataService from "../services/rol.service";
import UsuarioDataService from "../services/usuario.service";
import RolUsuarioDataService from "../services/rolUsuario.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Table, Container } from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class RolUsuario extends Component {

  state = {
    roles: [],
    usuarios: []
  };

  componentDidMount() {
    this.validarSesion();
    this.listarRoles();
    this.listarUsuarios();
  }

  listarRoles() {
    RolDataService.getAll()
      .then(response => {
        this.setState({
          roles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  listarUsuarios() {
    UsuarioDataService.getAll()
      .then(response => {
        this.setState({
          usuarios: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  agregarRol(usuarioId, rolId){
    console.log("Agregando rol:", usuarioId, rolId);
    RolUsuarioDataService.update(usuarioId, rolId)
      .then(response => {
        console.log("Rol agregado", usuarioId, rolId);
        alert("Rol " + rolId + " agregado para el usuario " + usuarioId);
      })
      .catch(e => {
        console.log(e);
      });
  }

  eliminarRol(usuarioId, rolId){
    console.log("Eliminando rol:", usuarioId, rolId);
    RolUsuarioDataService.delete(usuarioId, rolId)
      .then(response => {
        console.log("Rol eliminado", usuarioId, rolId);
        alert("Rol " + rolId + " eliminado para el usuario " + usuarioId);
      })
      .catch(e => {
        console.log(e);
      });
  }

  tieneRol(rol, usuario){
    let tieneRol = false;
    usuario.Rols.forEach(rolUsuario => {
      if(rolUsuario.Codigo === rol.Codigo){
        tieneRol = true;
      }
    });
    return tieneRol;
  }

  handleChange = (e) => {
    console.log(e.target);
    if(e.target.checked){
      this.agregarRol(e.target.getAttribute("usuario"), e.target.getAttribute("rol"));
    } else {
      this.eliminarRol(e.target.getAttribute("usuario"), e.target.getAttribute("rol"));
    }
    this.listarUsuarios();
  };

  validarSesion =() => {
    if (!cookies.get('UsuarioID')) {
      this.props.history.push('/login');
    }
  };

  render() {
    return (
      <>
        <Container>
        <br />
         <Row>
           <Col><h1>Administrar roles</h1></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Usuario</th>
                {this.state.roles.map((rol) => (
                    <th>{rol.Nombre}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.usuarios.map((usuarioTmp) => (
                <tr key={usuarioTmp.UsuarioID}>
                  <td>{usuarioTmp.UsuarioID}</td>
                  {this.state.roles.map((rolTmp) => (
                      <td>
                      <input
                      className="form-control"
                      type="checkbox"
                      usuario={usuarioTmp.UsuarioID}
                      rol={rolTmp.Codigo}
                      checked={this.tieneRol(rolTmp, usuarioTmp)}
                      onChange={this.handleChange}
                      />
                      </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}