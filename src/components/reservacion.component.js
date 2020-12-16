import React, { Component, useState } from "react";
import ReservaDataService from "../services/reservacion.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Label, Input} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Reserva extends Component {
  


  state = {
    data: [],
    listaClases: [],
    modalInsertar: false,
    modalActualizar: false,
    form: {
      Consecutivo: "",
      UsuarioID: "",
      VueloID:"",
      TipoPagoID: "" , 
      Fecha:"",
      CantCampos:""
    },
  };
  
  componentDidMount() {
    this.validarSesion();
    this.listarObjetos();
    this.listarClases();
  }

  listarObjetos() {
    ReservaDataService.getAll()
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

  listarClases() {
    ReservaDataService.getAll()
        .then(response => {
          this.setState({
            listaClases: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

  crearObjeto(data){
    ReservaDataService.create(data)
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
    ReservaDataService.update(data.Consecutivo, data)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
          this.cerrarModalActualizar();
        })
        .catch(e => {
          console.log(e);
        });
  }

  eliminarObjeto(Consecutivo  ){
    ReservaDataService.delete(Consecutivo)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
        })
        .catch(e => {
          console.log(e);
        });
  }

  nuevaReservacion = () => {
    return {
      Consecutivo: "",
      UsuarioID: "",
      VueloID:"",
      TipoPagoID:"",
      Fecha:"",
      CantCampos:""
    
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevaReservacion(),
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
           <Col><h1>Reservacion</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Consecutivo</th>
                <th>Usuario</th>
                <th>Vuelo</th>
                <th>TipoPago</th>
                <th>Fecha</th>
                <th>Cantidad de campos</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.Consecutivo}>
                  <td>{dato.UsuarioID}</td>
                  <td>{dato.VueloID}</td>
                  <td>{dato.TipoPagoID}</td>
                  <td>{dato.Fecha}</td>
                  <td>{dato.CantCampos}</td>

                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminarObjeto(dato.Consecutivo)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar consecutivo</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Consecutivo:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="number"
                value={this.state.form.Consecutivo}
              />
            </FormGroup>

         
            <FormGroup>
              <label>
                Usuario:
              </label>
              <input
                  className="form-control"
                  name="Usuario"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.form.UsuarioID}
                 
              />
            </FormGroup>

            <FormGroup>
              <label>
                Vuelo:
              </label>
              <input
                  className="form-control"
                  name="Vuelo"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.form.VueloID}
                 
              />
            </FormGroup>

            <FormGroup>
              <label>
                Tipo de pago:
              </label>
              <input
                  className="form-control"
                  name="TipoPago"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.TipoPagoID}
                  
                  
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha:
              </label>
              <input
                  className="form-control"
                  name="Fecha"
                  type="checkbox"
                  onChange={this.handleChange}
                  value={this.state.form.Fecha}
                
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cantidad de campos:
              </label>
              <input
                  className="form-control"
                  name="CantCampos"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.form.CantCampos}
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
           <div><h3>Insertar reservacion</h3></div>
          </ModalHeader>

          <ModalBody>
           
          <FormGroup>
              <label>
               Consecutivo:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="number"
                value={this.state.form.Consecutivo}
              />
            </FormGroup>

         
            <FormGroup>
              <label>
                Usuario:
              </label>
              <input
                  className="form-control"
                  name="UsuarioID"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.UsuarioID}
                 
              />
            </FormGroup>

            <FormGroup>
              <label>
                Vuelo:
              </label>
              <input
                  className="form-control"
                  name="Vuelo"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.VueloID}
                 
              />
            </FormGroup>

            <FormGroup>
              <label>
                Tipo de pago:
              </label>
              <input
                  className="form-control"
                  name="TipoPago"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.TipoPagoID}
                  
                  
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
                Cantidad de campos:
              </label>
              <input
                  className="form-control"
                  name="CantCampos"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.form.CantCampos}
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