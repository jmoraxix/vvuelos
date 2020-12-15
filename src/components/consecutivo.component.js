import React, { Component } from "react";
import ConsecutivoDataService from "../services/consecutivo.service";
import ClaseDataService from "../services/clase.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, checkbox} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Consecutivo extends Component {
  
  state = {
    data: [],
    listaClases: [],
    modalInsertar: false,
    modalActualizar: false,
    isPrefijoChecked:false,
   
   

    
    form: {
      Codigo: "",
      Clase: "",
      TienePrefijo:"",
      Prefijo: "" , 
      TieneRango:"",
      RangoInicial:"",
      RangoFinal:"",
      Actual:"",
      
      
    },
  };
  
  componentDidMount() {
    this.listarObjetos();
    this.validarSesion();
    this.listarClases();
  }

  listarObjetos() {
    ConsecutivoDataService.getAll()
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

  listarClases() {
    ClaseDataService.getAll()
        .then(response => {
          this.setState({
            listaClases: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

  crearObjeto(data){
    ConsecutivoDataService.create(data)
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
    ConsecutivoDataService.update(data.Codigo, data)
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
    ConsecutivoDataService.delete(Codigo)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
        })
        .catch(e => {
          console.log(e);
        });
  }

  nuevoConsecutivo = () => {
    return {
      Codigo: 0,
      Clase: 0,
      TienePrefijo: false,
      Prefijo: "",
      TieneRango: false,
      RangoInicial: 0,
      RangoFinal: 0,
      Actual:""
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevoConsecutivo(),
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
  

  verifyCallback(response) {
    if (response) {
      this.setState({
        isPrefijoChecked: true
      })
    }
  }

   
  validarSesion =() => {
    if (!cookies.get('UsuarioID')) {
      this.props.history.push('/login');
    }
  };
  render() {
    this.verifyCallback = this.verifyCallback.bind(this);
   
   
       
    return (
      <>
        <Container>
        <br />
         <Row>
           <Col><h1>Consecutivo</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Clase</th>
                <th>Tiene prefijo</th>
                <th>Prefijo</th>
                <th>Tiene rango</th>
                <th>Rango inicial</th>
                <th>Rango final</th>
                <th>Actual</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.Codigo}>
                  <td>{dato.Codigo}</td>
                  <td>{dato.Nombre}</td>
                  <td>{dato.TienePrefijo}</td>
                  <td>{dato.Prefijo}</td>
                  <td>{dato.TieneRango}</td>
                  <td>{dato.RangoInicial}</td>
                  <td>{dato.RangoFinal}</td>
                  <td>{dato.Actual}</td>
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
           <div><h3>Editar consecutivo</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Codigo:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.Codigo}
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
                Tiene prefijo:
              </label>
              <input
                  className="form-control"
                  name="TienePrefijo"
                  type="checkbox"
                  onChange={this.handleChange}
                  value={this.state.form.TienePrefijo}
                  verifyCallback={this.verifyCallback}
          
                 
              />
            </FormGroup>

            <FormGroup>
              <label>
                Prefijo:
              </label>
              <input
                  className="form-control"
                  name="Prefijo"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.Prefijo}
                  
                  
              />
            </FormGroup>

            <FormGroup>
              <label>
                Tiene Rango:
              </label>
              <input
                  className="form-control"
                  name="TieneRango"
                  type="checkbox"
                  onChange={this.handleChange}
                 
              />
            </FormGroup>

            <FormGroup>
              <label>
                Rango Inicial:
              </label>
              <input
                  className="form-control"
                  name="RangoInicial"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.form.RangoInicial}
                  
              />
            </FormGroup>

            <FormGroup>
              <label>
                Rango final:
              </label>
              <input
                  className="form-control"
                  name="RangoFinal"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.form.RangoFinal}
                  
              />
            </FormGroup>

            <FormGroup>
              <label>
                Actual:
              </label>
              <input
                  className="form-control"
                  name="Actual"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.form.Actual}
                  
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
           <div><h3>Insertar consecutivo</h3></div>
          </ModalHeader>

          <ModalBody>
           
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
               Tiene prefijo:
              </label>
              <input
                className="form-control"
                style={{textAlign:"right"}}
                name="TienePrefijo"
                type="checkbox"
                onChange={this.handleChange}
                value={this.state.form.TienePrefijo}
                
              />
            </FormGroup>

            
            <FormGroup>
              <label>
                Prefijo:
              </label>
              <input
                className="form-control"
                name="Prefijo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Prefijo}
                
              />
            </FormGroup>


            <FormGroup>
              <label>
               Tiene rango:
              </label>
              <input
                className="form-control"
                name="TieneRango"
                type="checkbox"
                onChange={this.handleChange}
                value={this.state.form.TieneRango}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Rango inicial:
              </label>
              <input
                className="form-control"
                name="RangoInicial"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.RangoInicial}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Rango final:
              </label>
              <input
                className="form-control"
                name="RangoFinal"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.RangoFinal}
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