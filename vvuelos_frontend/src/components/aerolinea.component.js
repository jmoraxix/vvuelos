import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  { consecutivo: 1, nombre: "American Airlines" },
  { consecutivo: 2, nombre: "Taca" },
  { consecutivo: 3, nombre: "Avianca" }
];

export default class Aerolinea extends Component {

  state = {
    data: data,
    modalInsertar: false,
    modalActualizar: false,
    form: {
      consecutivo: "",
      nombre: ""
    },
  };

  nuevaAerolinea = () => {
    return {
      consecutivo: this.state.data.length + 1,
      nombre: ""
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevaAerolinea(),
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

  editar = (aerolineaEditada) => {
    var contador = 0;
    var listaAerolineas = this.state.data;
    listaAerolineas.map((registro) => {
      if (aerolineaEditada.consecutivo == registro.consecutivo) {
        listaAerolineas[contador].nombre = aerolineaEditada.nombre;
      }
      contador++;
    });
    this.setState({ data: listaAerolineas, modalActualizar: false });
  };

  eliminar = (aerolineaEliminar) => {
    var opcion = window.confirm("¿Está seguro que desea eliminar el ro?");
    if (opcion == true) {
      var contador = 0;
      var listaAerolineas = this.state.data;
      listaAerolineas.map((registro) => {
        if (aerolineaEliminar.consecutivo == registro.consecutivo) {
          listaAerolineas.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: listaAerolineas, modalInsertar: false });
    }
  };

  insertar= () => {
    var aerolineaNueva = {...this.state.form};
    aerolineaNueva.consecutivo = this.state.data.length+1;
    var listaAerolineas = this.state.data;
    listaAerolineas.push(aerolineaNueva);
    this.setState({ modalInsertar: false, data: listaAerolineas });
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
           <Col><h1>Aerolineas</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Consecutivo</th>
                <th>Aerolinea</th>
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
           <div><h3>Editar aerolinea</h3></div>
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
           <div><h3>Insertar aerolinea</h3></div>
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