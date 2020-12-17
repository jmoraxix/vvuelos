import React, { Component } from "react";
import ReservacionDataService from "../services/reservacion.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Table, Button, Container } from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Reservaciones extends Component {
  
  state = {
    data: []
  };
  
  componentDidMount() {
    this.validarSesion();
    this.listarObjetos();
  }

  listarObjetos() {
    ReservacionDataService.getAll()
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

  eliminarObjeto(Consecutivo){
    ReservacionDataService.delete(Consecutivo)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
        })
        .catch(e => {
          console.log(e);
        });
  }
  
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
           <Col><h1>Reservaciones</h1></Col>
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
                  <td>{dato.Consecutivo}</td>
                  <td>{dato.UsuarioID}</td>
                  <td>{dato.Vuelo.Consecutivo}</td>
                  <td>{dato.TipoPago.Nombre}</td>
                  <td>{dato.Fecha}</td>
                  <td>{dato.CantidadCampos}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}