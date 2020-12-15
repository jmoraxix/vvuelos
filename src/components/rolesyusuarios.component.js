import React, { Component } from "react";
import RolesyUsuarioDataService from "../services/rolesyusuarios.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter,checkbox} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class RolesUsuario extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalActualizar: false,
    form: {
      UsuarioID: "",
      Administrador: "",
      Seguridad:"",
      Consecutivo: "",
      Mantenimiento:"",
      Consulta:"",
      Cliente:""
    },
  };

  componentDidMount() {
    this.validarSesion();
    this.listarObjetos();
  }

  listarObjetos() {
    RolesyUsuarioDataService.getAll()
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

  actualizarObjeto(data){
    RolesyUsuarioDataService.update(data.UsuarioID, data)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
          this.cerrarModalActualizar();
        })
        .catch(e => {
          console.log(e);
        });
  }

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
           <Col><h1>Administrar roles</h1></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Administrador</th>
                <th>Seguridad</th>
                <th>Mantenimiento</th>
                <th>Cliente</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.UsuarioID}>
                  <td>{dato.UsuarioID}</td>
                  <td><input
                className="form-control"
                type="checkbox"
                value={this.state.form.Administrador}
              /></td>
              <td><input
                className="form-control"
                type="checkbox"
                value={this.state.form.Seguridad}
              /></td>
               <td><input
                className="form-control"
                type="checkbox"
                value={this.state.form.Mantenimiento}
              /></td>
              <td><input
                className="form-control"
                type="checkbox"
                value={this.state.form.Cliente}
              /></td>

              
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar rol</h3></div>
          </ModalHeader>

          <ModalBody>
          <FormGroup>
          
          </FormGroup>  
          <td><input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.UsuarioID}
              /></td>
              <FormGroup>
                  <td><input
                className="form-control"
                type="checkbox"
                value={this.state.form.Administrador}
              /></td>
              </FormGroup>  

              <FormGroup>
              <td>
        
                  <input
                className="form-control"
                type="checkbox"
                value={this.state.form.Seguridad}
                
              /></td>
              </FormGroup>
             
              <FormGroup>
               <td><input
                className="form-control"
                type="checkbox"
                value={this.state.form.Mantenimiento}
              /></td>
              </FormGroup>

              <FormGroup>
              <td><input
                className="form-control"
                type="checkbox"
                value={this.state.form.Cliente}
              /></td>
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
           <div><h3>Insertar rol</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Codigo: 
              </label>
              <input
                className="form-control"
                name="Codigo"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.Codigo}
                disabled
              />
            </FormGroup>

            <FormGroup>
              <label>
                Rol: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Nombre}
                Nombre
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