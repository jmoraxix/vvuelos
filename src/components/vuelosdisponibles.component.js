import React, { Component } from "react";
import VueloDataService from "../services/vuelo.service";
import ReservacionDataService from "../services/reservacion.service";
import TipoPagoDataService from "../services/tipoPago.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Input} from 'reactstrap';
import Cookies from 'universal-cookie';
import Tarjeta from './tarjeta.component';

const cookies = new Cookies();

export default class VueloDisponible extends Component {
  state = {
    listaVuelos: [],
    listaTipoPago: [],
    modalInsertar: false,
    form: {
      CantidadCampos: "",
      Consecutivo: "",
      VueloID: 0,
      UsuarioID: "",
      TipoPagoID: 0
    }
  };
  componentDidMount() {
    this.validarSesion();
    this.listarVuelos();
    this.listarTipoPago();
  }

  listarVuelos() {
    VueloDataService.getAll()
        .then(response => {
          this.setState({
            listaVuelos: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

  listarTipoPago() {
    TipoPagoDataService.getAll()
        .then(response => {
          this.setState({
            listaTipoPago: response.data
          });
          console.log("tipoPago",response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

  crearReservacion = (reservacion) => {
    ReservacionDataService.create(reservacion)
      .then(response => {
        console.log(response.data);
        this.listarObjetos();
        this.cerrarModalInsertar();
      })
      .catch(e => {
        console.log(e);
      });
  };

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
    console.log("cambio", e.target.name,e.target.value );
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarModalInsertar = (vueloID) => {
    let newForm = this.nuevaCompra();
    newForm.UsuarioID = cookies.get('UsuarioID');
    newForm.VueloID = vueloID;
    console.log(newForm);

    this.setState({
      form: newForm,
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
              onClick={() => this.mostrarModalInsertar(dato.Consecutivo)}
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
              <Row>
              <Col md="3">
                <label> Cantidad de campos: </label>
              </Col>
              <Col>
                <input
                    className="form-control"
                    name="Campos"
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.form.CantidadCampos}
                />
              </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col md="3">
                  <label> Tipo de pago:</label>
                </Col>
                <Col>

                  <Input type="select" name="TipoPagoID" id="TipoPagoID" onChange={this.handleChange} value={this.state.form.TipoPagoID}>
                    {this.state.listaTipoPago.map((tipoPagoTmp) => (
                        <option value={tipoPagoTmp.Codigo}>{tipoPagoTmp.Nombre}</option>
                    ))}
                  </Input>
                </Col>
              </Row>
            </FormGroup>
            { this.state.form.TipoPagoID === 1 &&
            < Tarjeta/>
            }
            { this.state.form.TipoPagoID === 3 &&
            // < EasyPay />
            <span>Easy pay</span>
            }
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={this.crearReservacion(this.state.form)}
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