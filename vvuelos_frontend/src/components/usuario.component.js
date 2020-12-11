import React, { Component } from "react";
import UsuarioDataService from "../services/usuario.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

export default class Usuario extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalActualizar: false,
    form: {
      Usuario: "",
      Contraseña: "",
      Correo:"",
      PreguntaSeg:"",
      RespuestaSeg:""

    },
  };

  componentDidMount() {
    this.listarObjetos();
  }

  listarObjetos() {
    UsuarioDataService.getAll()
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

  crearObjeto(data){
    UsuarioDataService.create(data)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
          this.cerrarModalInsertar();
        })
        .catch(e => {
          console.log(e);
        });
  }

  actualizarObjeto(data){
    UsuarioDataService.update(data.Usuario, data)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
          this.cerrarModalActualizar();
        })
        .catch(e => {
          console.log(e);
        });
  }

  eliminarObjeto(Usuario){
    UsuarioDataService.delete(Usuario)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
        })
        .catch(e => {
          console.log(e);
        });
  }

  nuevoUsuario = () => {
    return {
        Usuario: "",
        Contraseña: "",
        Correo:"",
        PreguntaSeg:"",
        RespuestaSeg:""
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevoUsuario(),
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
           <Col><h1>Usuarios</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Correo</th>
                <th>Pregunta de seguridad</th>
                <th>Respuesta de seguridad</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.Usuario}>
                  <td>{dato.Usuario}</td>
                  <td>{dato.Contraseña}</td>
                  <td>{dato.Correo}</td>
                  <td>{dato.PreguntaSeg}</td>
                  <td>{dato.RespuestaSeg}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminarObjeto(dato.Usuario)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Usuario:
              </label>
            
              <input
                className="form-control"
                name="Usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Usuario}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Contraseña: 
              </label>
              <input
                className="form-control"
                name="Contraseña"
                type="password"
                onChange={this.handleChange}
                value={this.state.form.Contraseña}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
                className="form-control"
                name="Correo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Correo}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Pregunta de seguridad: 
              </label>
              <input
                className="form-control"
                name="PreguntaSeg"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.PreguntaSeg}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Respuesta de seguridad: 
              </label>
              <input
                className="form-control"
                name="RespuestaSeg"
                type="hidden"
                onChange={this.handleChange}
                value={this.state.form.RespuestaSeg}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.actualizarObjeto(this.state.form)}
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
           <div><h3>Insertar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
          <FormGroup>
              <label>
               Usuario:
              </label>
            
              <input
                className="form-control"
                name="Usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Usuario}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Contraseña: 
              </label>
              <input
                className="form-control"
                name="Contraseña"
                type="password"
                onChange={this.handleChange}
                value={this.state.form.Contraseña}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
                className="form-control"
                name="Correo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Correo}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Pregunta de seguridad: 
              </label>
              <input
                className="form-control"
                name="PreguntaSeg"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.PreguntaSeg}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Respuesta de seguridad: 
              </label>
              <input
                className="form-control"
                name="RespuestaSeg"
                type="hidden"
                onChange={this.handleChange}
                value={this.state.form.RespuestaSeg}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.crearObjeto(this.state.form)}
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