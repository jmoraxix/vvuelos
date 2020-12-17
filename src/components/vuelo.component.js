import React, { Component } from "react";
import VueloDataService from "../services/vuelo.service";
import AerolineaDataService from "../services/aerolinea.service";
import EstadoVueloDataService from "../services/estadoVuelo.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class VueloDisponible extends Component {
  state = {
    listaVuelos: [],
    listaEstadoVuelos: [],
    listaAerolineas: [],
    modalInsertar: false,
        modalActualizar: false,
    form: {
      Consecutivo: "",
      Nombre: "",
      PaisOri: "",
      PaisDest: "",
      FechaHoraSal: "",
      Puerta: "",
      Nombre: "",
      Precio: "",
      Capacidad: ""
    }

  };
  componentDidMount() {
    this.validarSesion();
    this.listarAerolineas();
    this.listarVuelos();
    this.listarEstadoVuelos();
  }

  listarAerolineas() {
    AerolineaDataService.getAll()
      .then(response => {
        this.setState({
          listaAerolineas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  listarVuelos() {
    console.log(1);
    VueloDataService.getAll()
        .then(response => {
          console.log(2);
          this.setState({
            listaVuelos: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

  listarEstadoVuelos() {
    EstadoVueloDataService.getAll()
        .then(response => {
          this.setState({
            listaEstadoVuelos: response.data
          });
          console.log(response.data);
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
          Consecutivo: 0,
          Nombre: 0,
          PaisOri:"",
          PaisDest: "",
          FechaHoraSal:"",
          Puerta: "",
          Nombre:"",
          Precio:"",
          Capacidad: ""
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
               <Col><h1>Vuelos</h1></Col>
               <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
             </Row>
              <Table>
                <thead>
                  <tr>
                    <th>Consecutivo</th>
                    <th>Aerolinea</th>
                    <th>Pais Origen</th>
                    <th>Pais destino</th>
                    <th>Salida</th>
                    <th>Puerta</th>
                    <th>Estado del vuelo</th>
                    <th>Precio</th>
                    <th>Capacidad</th>
                  </tr>
                </thead>
    
                <tbody>
                {this.state.listaVuelos.map((dato) => (
                <tr key={dato.Consecutivo}>
                  <td>{dato.Consecutivo}</td>
                  <td>{dato.Aerolinea.Nombre}</td>
                  <td>{dato.PaisO.Nombre}</td>
                  <td>{dato.PaisD.Nombre}</td>
                  <td>{dato.FechaHoraSalida}</td>
                  <td>{dato.Puerta.Nombre}</td>
                  <td>{dato.EstadoVuelo.Nombre}</td>
                  <td>{dato.Precio}</td>
                  <td>{dato.Capacidad}</td>
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
               <div><h3>Editar vuelos</h3></div>
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
                    Pais Origen: 
                  </label>
                  <input
                    className="form-control"
                    name="PaisOri"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.PaisOri}
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
                    Salida: 
                  </label>
                  <input
                    className="form-control"
                    name="FechaHoraSal"
                    type="datetime.Now"
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
                    Estado del vuelo:
                  </label>
                  <input
                    className="form-control"
                    name="EstadoVuelo"
                    type="number"
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
                    value={this.state.form.Nombre}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Pais Origen: 
                  </label>
                  <input
                    className="form-control"
                    name="PaisOri"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.PaisOri}
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
                    Salida: 
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
                    Estado del vuelo:
                  </label>
                  <input
                    className="form-control"
                    name="EstadoVuelo"
                    type="number"
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