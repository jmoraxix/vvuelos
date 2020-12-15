import React, { Component } from "react";
import BitacoraDataService from "../services/bitacora.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Bitacora extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalActualizar: false,
    form: {
      Codigo: "",
      Usuario: "",
      Clase:"",
      Accion:"",
      Detalle:""

    },
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

  crearObjeto(data){
    BitacoraDataService.create(data)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
          this.cerrarModalInsertar();
        })
        .catch(e => {
          console.log(e);
        });
  }

  actualizarObjeto(data){
    BitacoraDataService.update(data.Codigo, data)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
          this.cerrarModalActualizar();
        })
        .catch(e => {
          console.log(e);
        });
  }

  eliminarObjeto(Codigo){
    BitacoraDataService.delete(Codigo)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
        })
        .catch(e => {
          console.log(e);
        });
  }

  nuevaBitacora = () => {
    return {
        Codigo: "",
        Usuario: "",
        Clase:"",
        Accion:"",
        Detalle:""
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevaBitacora(),
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
           <Col><h1>Bitacora</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Codigo</th>
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
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminarObjeto(dato.Codigo)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Bitacora</h3></div>
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
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Usuario: 
              </label>
              <input
                className="form-control"
                name="Usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Usuario}
              />
            </FormGroup>

    

            <FormGroup>
              <label>
                Clase: 
              </label>
              <input
                className="form-control"
                name="Clase"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.Clase}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Detalle: 
              </label>
              <input
                className="form-control"
                name="Detalle"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Detalle}
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
           <div><h3>Insertar Usuario</h3></div>
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
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Usuario: 
              </label>
              <input
                className="form-control"
                name="Usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Usuario}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
                className="form-control"
                name="Correo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Correo}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Clase: 
              </label>
              <input
                className="form-control"
                name="Clase"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Clase}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Detalle: 
              </label>
              <input
                className="form-control"
                name="Detalle"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Detalle}
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