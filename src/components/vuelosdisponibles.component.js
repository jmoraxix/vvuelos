import React, { Component } from "react";
import VuelosDisponibleDataService from "../services/vuelosdisponibles.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class VueloDisponible extends Component {
  state = {
    data: [],
    modalInsertar: false,
        modalActualizar: false,
    form: {
      Consecutivo: "",
      Aerolinea: "",
      PaisOri: "",
      PaisDest: "",
      FechaHoraSal: "",
      Puerta: "",
      EstadoVuelo: "",
      Precio: "",
      Capacidad: ""
    }

  };
  componentDidMount() {
    this.validarSesion();
    this.listarObjetos();
  }

  listarObjetos() {
    VuelosDisponibleDataService.getAll()
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

  crearObjeto(data) {
    console.log(data);
    VuelosDisponibleDataService.create(data)
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
    VuelosDisponibleDataService.update(data.Consecutivo, data)
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
      Capacidad: "",
      Precio: ""
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
            <Col><Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button></Col>
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
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.Consecutivo}>
                  <td>{dato.Consecutivo}</td>
                  <td>{dato.Aerolinea}</td>
                  <td>{dato.PaisOri}</td>
                  <td>{dato.PaisDest}</td>
                  <td>{dato.FechaHoraSal}</td>
                  <td>{dato.Puerta}</td>
                  <td>{dato.EstadoVuelo}</td>
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