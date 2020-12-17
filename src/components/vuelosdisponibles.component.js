import React, { Component } from "react";
import VueloDataService from "../services/vuelo.service";
import ReservacionDataService from "../services/reservacion.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import Cookies from 'universal-cookie';
import Tarjeta from './tarjeta.component';

const cookies = new Cookies();

export default class VueloDisponible extends Component {
  state = {
    listaVuelos: [],
    modalInsertar: false,
    form: {
      CantidadCampos: "",
      Consecutivo: "",
      VueloID:"",
      UsuarioID:"",
      TipoPagoID:""
    }

  };
  componentDidMount() {
    this.validarSesion();
    this.listarVuelos();

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

  crearObjeto(data) {
    console.log(data);
    ReservacionDataService.create(data)
      .then(response => {
        console.log(response.data);
        this.listarObjetos();
        this.cerrarModalInsertar();
      })
      .catch(e => {
        console.log(e);
      });
  }

  nuevaCompra = () => {
    return {
      CantidadCampos: "",
      Consecutivo: "",
      VueloID:"",
      UsuarioID:"",
      TipoPagoID:"",
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

      
          <Modal className="modal-dialog modal-xl" isOpen={this.state.modalInsertar}>
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
            < Tarjeta/>
         </ModalBody>


          <ModalFooter>
            <Button
              color="primary"
              onClick={this.changeState}
            >
              Pagar
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