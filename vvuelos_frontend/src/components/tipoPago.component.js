import React, { Component } from "react";
import TipoPagoDataService from "../services/tipoPago.service";
import "../login/node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

export default class TipoPago extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalActualizar: false,
    form: {
      Nombre: ""
    },
  };

  componentDidMount() {
    this.listarObjetos();
  }

  listarObjetos() {
    TipoPagoDataService.getAll()
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
    console.log(data);
    TipoPagoDataService.create(data)
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
    TipoPagoDataService.update(data.Codigo, data)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
          this.cerrarModalActualizar();
        })
        .catch(e => {
          console.log(e);
        });
  }

  eliminarObjeto(Codigo){
    TipoPagoDataService.delete(Codigo)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
        })
        .catch(e => {
          console.log(e);
        });
  }

  nuevoTipoPago = () => {
    return {
      Nombre: ""
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
                <th>Codigo</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.Codigo}>
                  <td>{dato.Codigo}</td>
                  <td>{dato.Nombre}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminarObjeto(dato.Codigo)}>Eliminar</Button>
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
               Codigo:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.Codigo}
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
           <div><h3>Insertar tipo de pago</h3></div>
          </ModalHeader>

          <ModalBody>
           

            <FormGroup>
              <label>
                Tipo: 
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