import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  { id: 1, nombre: "Debito" },
  { id: 2, nombre: "Credito" },
  { id: 3, nombre: "Paypal" }
];

export default class TipoPago extends Component {

  state = {
    data: data,
    modalInsertar: false,
    modalActualizar: false,
    form: {
      id: "",
      nombre: ""
    },
  };

  nuevoTipoPago = () => {
    return {
      id: this.state.data.length + 1,
      nombre: ""
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevoTipoPago(),
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

  editar = (tipoEditado) => {
    var contador = 0;
    var listaTipos = this.state.data;
    listaTipos.map((registro) => {
      if (tipoEditado.id == registro.id) {
        listaTipos[contador].nombre = tipoEditado.nombre;
      }
      contador++;
    });
    this.setState({ data: listaTipos, modalActualizar: false });
  };

  eliminar = (tipoEliminar) => {
    var opcion = window.confirm("¿Está seguro que desea eliminar el ro?");
    if (opcion == true) {
      var contador = 0;
      var listaTipos = this.state.data;
      listaTipos.map((registro) => {
        if (tipoEliminar.id == registro.id) {
          listaTipos.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: listaTipos, modalInsertar: false });
    }
  };

  insertar= () => {
    var tipoNuevo = {...this.state.form};
    tipoNuevo.id = this.state.data.length+1;
    var listaTipos = this.state.data;
    listaTipos.push(tipoNuevo);
    this.setState({ modalInsertar: false, data: listaTipos });
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
           <Col><h1>Tipos de pago</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
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
           <div><h3>Editar tipo de pago</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               ID:
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
           <div><h3>Insertar tipo de pago</h3></div>
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