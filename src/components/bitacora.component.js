import React, { Component } from "react";
import BitacoraDataService from "../services/bitacora.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Table, Container } from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Bitacora extends Component {

  state = {
    data: []
  };

  componentDidMount() {
    this.validarSesion();
    this.listarObjetos();
  }

  listarObjetos() {
    BitacoraDataService.getAll()
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
           <Col><h1>Bit&aacute;cora</h1></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>C&oacute;digo</th>
                <th>Usuario</th>
                <th>Clase</th>
                <th>Detalle</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.Codigo}>
                  <td>{dato.Codigo}</td>
                  <td>{dato.Usuario}</td>
                  <td>{dato.Clase}</td>
                  <td>{dato.Accion}</td>
                  <td>{dato.Detalle}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}