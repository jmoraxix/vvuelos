import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  { consecutivo: 1, nombre: "Puerta 1" },
  { consecutivo: 2, nombre: "Puerta 2" },
  { consecutivo: 3, nombre: "Puerta 3" },
  { consecutivo: 4, nombre: "Puerta 4" }
];

export default class Puerta extends Component {

  state = {
    data: data,
    modalInsertar: false,
    modalActualizar: false,
    form: {
      consecutivo: "",
      nombre: ""
    },
  };

  nuevaPuerta = () => {
    return {
      consecutivo: this.state.data.length + 1,
      nombre: ""
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevaPuerta(),
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

  editar = (puertaEditada) => {
    var contador = 0;
    var listaPuertas = this.state.data;
    listaPuertas.map((registro) => {
      if (puertaEditada.consecutivo == registro.consecutivo) {
        listaPuertas[contador].nombre = puertaEditada.nombre;
      }
      contador++;
    });
    this.setState({ data: listaPuertas, modalActualizar: false });
  };

  eliminar = (puertaEliminar) => {
    var opcion = window.confirm("¿Está seguro que desea eliminar el ro?");
    if (opcion == true) {
      var contador = 0;
      var listaPuertas = this.state.data;
      listaPuertas.map((registro) => {
        if (puertaEliminar.consecutivo == registro.consecutivo) {
          listaPuertas.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: listaPuertas, modalInsertar: false });
    }
  };

  insertar= () => {
    var puertaNueva = {...this.state.form};
    puertaNueva.consecutivo = this.state.data.length+1;
    var listaPuertas = this.state.data;
    listaPuertas.push(puertaNueva);
    this.setState({ modalInsertar: false, data: listaPuertas });
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
           <Col><h1>Puertas</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Consecutivo</th>
                <th>Puerta</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.consecutivo}>
                  <td>{dato.consecutivo}</td>
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
           <div><h3>Editar puerta</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Consecutivo:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.consecutivo}
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
           <div><h3>Insertar puerta</h3></div>
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