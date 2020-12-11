import React, { Component } from "react";
import VueloDataService from "../services/vuelo.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

export default class Vuelo extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalActualizar: false,
        form: {
          Codigo: "",
          Nombre: "",
          PaisDest: "",
          FechaHoraSal:"",
          Puerta: "",
          EstadoVuelo:"",
          Precio:"",
          Capacidad: ""
        },
      };

      componentDidMount() {
        this.listarObjetos();
      }
    
      listarObjetos() {
            VueloDataService.getAll()
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
        VueloDataService.create(data)
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
        VueloDataService.update(data.Consecutivo, data)
            .then(response => {
              console.log(response.data);
              this.listarObjetos();
              this.cerrarModalActualizar();
            })
            .catch(e => {
              console.log(e);
            });
      }
    
      eliminarObjeto(Consecutivo){
        VueloDataService.delete(Consecutivo)
            .then(response => {
              console.log(response.data);
              this.listarObjetos();
            })
            .catch(e => {
              console.log(e);
            });
      }
    
      nuevoVuelo = () => {
        return {
          Consecutivo: 1,
          Nombre: "",
          PaisDest: "",
          FechaHoraSal:"",
          Puerta: 4,
          EstadoVuelo:"Atrasado",
          Precio:500,
          Capacidad: 100
        };
      }
    
      mostrarModalInsertar = () => {
        this.setState({
          form: this.nuevoVuelo(),
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
               <Col><h1>Vuelos</h1></Col>
               <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
             </Row>
              <Table>
                <thead>
                  <tr>
                    <th>Consecutivo</th>
                    <th>Aerolinea</th>
                    <th>Pais destino</th>
                    <th>Fecha y hora de salida</th>
                    <th>Puerta</th>
                    <th>Estado del vuelo</th>
                    <th>Precio</th>
                    <th>Capacidad</th>
                  </tr>
                </thead>
    
                <tbody>
                  {this.state.data.map((dato) => (
                    <tr key={dato.Codigo}>
                      <td>{dato.Codigo}</td>
                      <td>{dato.Nombre}</td>
                      <td>{dato.PaisDest}</td>
                      <td>{dato.FechaHoraSal}</td>
                      <td>{dato.Puerta}</td>
                      <td>{dato.EstadoVuelo}</td>
                      <td>{dato.Precio}</td>
                      <td>{dato.Capacidad}</td>
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
               <div><h3>Editar vuelos</h3></div>
              </ModalHeader>
    
              <ModalBody>
                <FormGroup>
                  <label>
                  Consecutivos:
                  </label>
                
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={this.state.form.Consecutivo}
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>
                    Aerolinea: 
                  </label>
                  <input
                    className="form-control"
                    name="Nombre"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.Nombre}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Pais destino: 
                  </label>
                  <input
                    className="form-control"
                    name="PaisDest"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.PaisDest}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Fecha y hora de salida: 
                  </label>
                  <input
                    className="form-control"
                    name="FechaHoraSal"
                    type="datetime"
                    onChange={this.handleChange}
                    value={this.state.form.FechaHoraSal}
                    
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Puerta:
                  </label>
                  <input
                    className="form-control"
                    name="Puerta"
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.form.Puerta}
                    disabled
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Estado Vuelo:
                  </label>
                  <input
                    className="form-control"
                    name="EstadoVuelo"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.EstadoVuelo}
                    disabled
                  />
</FormGroup>
<FormGroup>
                  <label>
                    Precio:
                  </label>
                  <input
                    className="form-control"
                    name="Precio"
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.form.Precio}
                    disabled
                  />
                
                </FormGroup>

                <FormGroup>
                  <label>
                    Capacidad:
                  </label>
                  <input
                    className="form-control"
                    name="Capacidad"
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.form.Capacidad}
                    disabled
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
               <div><h3>Insertar vuelo</h3></div>
              </ModalHeader>
    
              <ModalBody>
                <FormGroup>
                  <label>
                  Consecutivos:
                  </label>
                
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={this.state.form.Consecutivo}
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>
                    Aerolinea: 
                  </label>
                  <input
                    className="form-control"
                    name="Aerolinea"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.Aerolinea}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Pais destino: 
                  </label>
                  <input
                    className="form-control"
                    name="PaisDest"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.PaisDest}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Fecha y hora de salida: 
                  </label>
                  <input
                    className="form-control"
                    name="FechaHoraSalida"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.FechaHoraSalida}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Puerta:
                  </label>
                  <input
                    className="form-control"
                    name="Puerta"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.Puerta}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Estado Vuelo:
                  </label>
                  <input
                    className="form-control"
                    name="EstadoVuelo"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.EstadoVuelo}
                  />
</FormGroup>
<FormGroup>
                  <label>
                    Precio:
                  </label>
                  <input
                    className="form-control"
                    name="Precio"
                    type="double"
                    onChange={this.handleChange}
                    value={this.state.form.Precio}
                  />
                
                </FormGroup>

                <FormGroup>
                  <label>
                    Capacidad:
                  </label>
                  <input
                    className="form-control"
                    name="Capacidad"
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.form.Capacidad}
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