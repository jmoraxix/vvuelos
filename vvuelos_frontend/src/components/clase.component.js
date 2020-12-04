import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  { id: 1, Nombre: "Aeronlinea" },
  { id: 2, Nombre: "Pais" },
  { id: 3, Nombre: "Puerta" },
  { id: 4, Nombre: "Vuelo" },
  { id: 5, Nombre: "Reservacion" }
];

export default class TipoPago extends Component {

  state = {
    data: data,
    modalInsertar: false,
    modalActualizar: false,
    form: {
      id: "",
      Nombre: ""
    },
  };

  nuevaClase = () => {
    return {
      id: this.state.data.length + 1,
      Nombre: ""
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevaClase(),
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

  editar = (claseEditada) => {
    var contador = 0;
    var listaClases = this.state.data;
    listaClases.map((registro) => {
      if (claseEditada.id == registro.id) {
        listaClases[contador].Nombre = claseEditada.Nombre;
      }
      contador++;
    });
    this.setState({ data: listaClases, modalActualizar: false });
  };

  eliminar = (claseEliminar) => {
    var opcion = window.confirm("¿Está seguro que desea eliminar el ro?");
    if (opcion == true) {
      var contador = 0;
      var listaClases = this.state.data;
      listaClases.map((registro) => {
        if (claseEliminar.id == registro.id) {
          listaClases.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: listaClases, modalInsertar: false });
    }
  };

  insertar= () => {
    var claseNueva = {...this.state.form};
    claseNueva.id = this.state.data.length+1;
    var listaClases = this.state.data;
    listaClases.push(claseNueva);
    this.setState({ modalInsertar: false, data: listaClases });
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
           <Col><h1>Clases</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Clase</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.Nombre}</td>
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
           <div><h3>Editar clase</h3></div>
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
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Nombre}
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
           <div><h3>Insertar clase</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Nombre}
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