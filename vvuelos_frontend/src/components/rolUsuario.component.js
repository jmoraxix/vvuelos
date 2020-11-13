import React, { Component } from "react";
import RolUsuarioDataService from "../services/rolUsuario.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  { id: 1, nombre: "Admin" },
  { id: 2, nombre: "Maintainer" }
];

export default class RolUsuario extends Component {

  state = {
    data: data,
    modalInsertar: false,
    modalActualizar: false,
    form: {
      id: "",
      nombre: ""
    },
  };

  // componentDidMount() {
  //   this.retrieveList();
  // }

  retrieveList() {
    RolUsuarioDataService.getAll()
      .then(response => {
        this.setState({
          data: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveList();
    this.setState({
      currentTutorial: null
    });
  }

  nuevoRolUsuario = () => {
    return {
      id: this.state.data.length + 1,
      nombre: ""
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevoRolUsuario(),
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  editar = (rolEditado) => {
    var contador = 0;
    var listaRoles = this.state.data;
    listaRoles.map((registro) => {
      if (rolEditado.id === registro.id) {
        listaRoles[contador].nombre = rolEditado.nombre;
      }
      contador++;
    });
    this.setState({ data: listaRoles, modalActualizar: false });
  };

  eliminar = (rolEliminar) => {
    var opcion = window.confirm("¿Está seguro que desea eliminar el ro?");
    if (opcion === true) {
      var contador = 0;
      var listaRoles = this.state.data;
      listaRoles.map((registro) => {
        if (rolEliminar.id === registro.id) {
          listaRoles.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: listaRoles, modalInsertar: false });
    }
  };

  insertar= () => {
    var rolNuevo = {...this.state.form};
    rolNuevo.id = this.state.data.length+1;
    var listaRoles = this.state.data;
    listaRoles.push(rolNuevo);
    this.setState({ modalInsertar: false, data: listaRoles });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };


  render() {
    return (
      <>
        <Container>
        <br />
         <Row>
           <Col><h1>Roles de usuarios</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
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
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar rol</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}