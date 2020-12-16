import React, { Component } from "react";
import RolDataService from "../services/rol.service";
import UsuarioDataService from "../services/usuario.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Label, Input} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class RolUsuario extends Component {

  state = {
    roles: [],
    usuarios: [],
    modalActualizar: false,
    usuarioEditar: {}
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

  actualizarObjeto(usuario, data){
    console.log("Actualizar roles", data);
    // RolDataService.update(usuario, data)
    //   .then(response => {
    //     console.log(response.data);
    //     this.listarRoles();
    //     this.listarUsuarios();
    //     this.cerrarModalActualizar();
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }

  tieneRol(rol, usuario){
    console.log(rol, usuario);
    let tieneRol = true;
    //TODO Validar si tiene rol
    return tieneRol;
  }

  mostrarModalActualizar = (usuarioEditar) => {
    this.setState({
      usuarioEditar: usuarioEditar,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
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
                    <th>rol.Nombre</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.usuarios.map((usuario) => (
                <tr key={usuario.UsuarioID}>
                  <td>{usuario.UsuarioID}</td>
                  {this.state.roles.map((rol) => (
                      <td>
                      <input
                      className="form-control"
                      type="checkbox"
                      value={this.tieneRol(rol, usuario)}
                      />
                      </td>
                  ))}
                  <td>
                    <Button color="warning" onClick={() => this.mostrarModalActualizar(usuario)} >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar rol</h3></div>
          </ModalHeader>
          <ModalBody>
            <h1>{this.state.usuarioEditar.UsuarioID}</h1>
            <form id="formRoles">
              {this.state.roles.map((rol) => (
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" id={rol.Nombre} value={rol.Codigo}
                             checked={this.tieneRol(rol, this.state.usuarioEditar)}/>{' '}
                      {rol.Nombre}
                    </Label>
                  </FormGroup>
              ))}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.actualizarObjeto(this.state.form)} >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()} >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}