import React, { Component } from "react";
import ReservacionUsuarioDataService from "../services/reservacionUsuario.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Table, Container } from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class ReservacionesUsuario extends Component {
  
  state = {
    data: []
  };
  
  componentDidMount() {
    this.validarSesion();
    this.listarObjetos();
  }

  listarObjetos() {
    ReservacionUsuarioDataService.get(cookies.get('UsuarioID'))
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
           <Col><h1>Mis reservaciones</h1></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Consecutivo</th>
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