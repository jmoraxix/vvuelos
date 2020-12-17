import React, { Component } from "react";
import RolDataService from "../services/rol.service";
import UsuarioDataService from "../services/usuario.service";
import RolUsuarioDataService from "../services/rolUsuario.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Table, Container } from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const rols_data = [
  {
    "Codigo": 1,
    "Nombre": "Administrador"
  },
  {
    "Codigo": 2,
    "Nombre": "Seguridad"
  },
  {
    "Codigo": 5,
    "Nombre": "Consecutivo"
  },
  {
    "Codigo": 6,
    "Nombre": "Mantenimiento"
  },
  {
    "Codigo": 7,
    "Nombre": "Consulta"
  }
];

const users_data = [
  {
    "Rols": [],
    "UsuarioID": "AAAAAAAAAAAAAA",
    "Contrasena": "AAAAAAAAAAAAAAA",
    "Correo": "AAAAAAA@GMAIL.com",
    "PreguntaSeg": "aaaaaaaaaaaaaaa",
    "RespuestaSeg": "aaaaaaaaaaaa"
  },
  {
    "Rols": [
      {
        "Codigo": 1,
        "Nombre": "Administrador"
      },
      {
        "Codigo": 2,
        "Nombre": "Seguridad"
      },
      {
        "Codigo": 6,
        "Nombre": "Mantenimiento"
      }
    ],
    "UsuarioID": "Admin",
    "Contrasena": "admin",
    "Correo": "admin@gmail.com",
    "PreguntaSeg": "Universidad",
    "RespuestaSeg": "Ulacit"
  },
  {
    "Rols": [],
    "UsuarioID": "asa",
    "Contrasena": "a",
    "Correo": "a",
    "PreguntaSeg": "a",
    "RespuestaSeg": "a"
  },
  {
    "Rols": [],
    "UsuarioID": "Prueba1",
    "Contrasena": "1234",
    "Correo": "prueba@gmail.com",
    "PreguntaSeg": "Comida Favorita",
    "RespuestaSeg": "Pizza"
  },
  {
    "Rols": [],
    "UsuarioID": "Sebas",
    "Contrasena": "12345678",
    "Correo": "skddrrjsnjs@gmail.com",
    "PreguntaSeg": "Perro tap",
    "RespuestaSeg": "soyadmin"
  },
  {
    "Rols": [],
    "UsuarioID": "William",
    "Contrasena": "12345678",
    "Correo": "skddsjddnjsnjs@gmail.com",
    "PreguntaSeg": "Perro fav",
    "RespuestaSeg": "123456789"
  }
]

export default class RolUsuario extends Component {

  state = {
    roles: [],
    usuarios: []
    // roles: rols_data,
    // usuarios: users_data
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
    // console.log(tieneRol, rol, usuario);
    return tieneRol;
  }

  handleChange = (e) => {
    console.log(e.target);
    if(e.target.checked){
      this.agregarRol(e.target.getAttribute("usuario"), e.target.getAttribute("rol"));
    } else {
      this.eliminarRol(e.target.getAttribute("usuario"), e.target.getAttribute("rol"));
    }
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