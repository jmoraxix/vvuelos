import React, { Component } from "react";
import ErrorDataService from "../services/error.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Table, Container } from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Error extends Component {

  state = {
    data: []
  };

  componentDidMount() {
    this.validarSesion();
    this.listarObjetos();
  }

  listarObjetos() {
    ErrorDataService.getAll()
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
           <Col><h1>Errores</h1></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>C&oacute;digo</th>
                <th>N&uacute;mero</th>
                <th>Fecha</th>
                <th>Mensaje</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.Codigo}>
                  <td>{dato.Codigo}</td>
                  <td>{dato.Numero}</td>
                  <td>{dato.Fecha}</td>
                  <td>{dato.Mensaje}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}