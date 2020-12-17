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
      Campos: "",
      
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

  crearObjeto(data) {
    console.log(data);
    AerolineaDataService.create(data)
      .then(response => {
        console.log(response.data);
        this.listarObjetos();
        this.cerrarModalInsertar();
      })
      .catch(e => {
        console.log(e);
      });
  }

  actualizarObjeto(data) {
    AerolineaDataService.update(data.Consecutivo, data)
      .then(response => {
        console.log(response.data);
        this.listarObjetos();
        this.cerrarModalActualizar();
      })
      .catch(e => {
        console.log(e);
      });
  }
  nuevaCompra = () => {
    return {
      Campos: "",
      Consecutivo: ""
      
    };
  }

  agregarTarjeta = () => {
    return {
      Campos: "",
      Consecutivo: ""
      
    };
  }


  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevaCompra(),
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
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
            <Col><h1>Reservar vuelos</h1></Col>
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
                <th>Comprar boletos</th>
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
                  <td> <Button
              color="primary"
              onClick={() => this.mostrarModalInsertar()}
            >
              Comprar
                </Button></td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

      
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
              <div><h3>Reservar</h3></div>
            </ModalHeader>

            <ModalBody>
            <FormGroup>
              <label>
                Cantidad de campos:
                  </label>
              <input
                className="form-control"
                name="Campos"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.Campos}
              />

            </FormGroup>
         </ModalBody>


          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.crearObjeto(this.state.form)}
            >
              Pagar
                </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Agregar Tarjeta
                </Button>

                <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Easy Pay
                </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}