import React, { Component } from "react";
import ErroresDataService from "../services/errores.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

export default class Error extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalActualizar: false,
    form: {
      Codigo: "",
      Numero: "",
      Fecha:"",
      Mensaje:""

    },
  };

  componentDidMount() {
    this.listarObjetos();
  }

  listarObjetos() {
    ErroresDataService.getAll()
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
    ErroresDataService.create(data)
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
    ErroresDataService.update(data.Codigo, data)
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
    ErroresDataService.delete(Codigo)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
        })
        .catch(e => {
          console.log(e);
        });
  }

  nuevoError = () => {
    return {
        Codigo: "",
        Numero: "",
        Fecha:"",
        Mensaje:""
  
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevoError(),
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
           <Col><h1>Errores</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Numero</th>
                <th>Fecha</th>
                <th>Mensaje</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.Codigo}>
                  <td>{dato.Codigo}</td>
                  <td>{dato.Numero}</td>
                  <td>{dato.Fecha}</td>
                  <td>{dato.Mensaje}</td>
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
                Numero: 
              </label>
              <input
                className="form-control"
                name="Numero"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.Numero}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha: 
              </label>
              <input
                className="form-control"
                name="Fecha"
                type="datetime"
                onChange={this.handleChange}
                value={this.state.form.Fecha}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Mensaje: 
              </label>
              <input
                className="form-control"
                name="Mensaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Mensaje}
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
           <div><h3>Insertar error</h3></div>
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
                Numero: 
              </label>
              <input
                className="form-control"
                name="Numero"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.Numero}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha: 
              </label>
              <input
                className="form-control"
                name="Fecha"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.Fecha}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Mensaje: 
              </label>
              <input
                className="form-control"
                name="Mensaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Mensaje}
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