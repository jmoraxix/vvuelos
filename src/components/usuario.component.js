import React, { Component } from "react";
import UsuarioDataService from "../services/usuario.service";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import Recaptcha from 'react-recaptcha';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export default class Usuario extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalActualizar: false,
    isVerified: false,
    form: {
      UsuarioID: "",
      Contrasena: "",
      Correo:"",
      PreguntaSeg:"",
      RespuestaSeg:""

    },
    errors:{ 
      UsuarioID: "",
      Contrasena: "",
      Correo:"",
      PreguntaSeg:"",
      RespuestaSeg:""
    }
  };

  componentDidMount() {
    this.validarSesion();
    this.listarObjetos();
  }

  listarObjetos() {
    UsuarioDataService.getAll()
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
    UsuarioDataService.create(data)
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
    UsuarioDataService.update(data.UsuarioID, data)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
          this.cerrarModalActualizar();
        })
        .catch(e => {
          console.log(e);
        });
  }

  eliminarObjeto(Usuario){
    UsuarioDataService.delete(Usuario)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
        })
        .catch(e => {
          console.log(e);
        });
  }

  nuevoUsuario = () => {
    return {
        UsuarioID: "",
        Contrasena: "",
        Correo:"",
        PreguntaSeg:"",
        RespuestaSeg:""
    };
  }

  mostrarModalInsertar = () => {
    this.setState({
      form: this.nuevoUsuario(),
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

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });

    switch (name) {
      case 'UsuarioID': 
        errors.UsuarioID = 
          value.length < 5
            ? 'El usuario debe tener al menos 5 caracteres!'
            : '';
        break;
      case 'Correo': 
        errors.Correo = 
          validEmailRegex.test(value)
            ? ''
            : 'El email no es valido';
        break;
      case 'Contrasena': 
        errors.Contrasena = 
          value.length < 8
            ? 'La contraseña debe tener al menos 8 caracteres!'
            : '';
        break;
        case 'PreguntaSeg': 
          errors.PreguntaSeg = 
            value.length < 8
              ? 'La pregunta de seguridad debe tener al menos 8 caracteres!'
              : '';
          break;
          case 'RespuestaSeg': 
            errors.RespuestaSeg = 
              value.length < 8
                ? 'La respuesta de seguridad debe tener al menos 8 caracteres!'
                : '';
            break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

    
  
  
  recaptchaLoaded() {
    console.log('capcha correctamente cargado');
  }

  handleRegister() {
    if (this.state.isVerified) {
      this.crearObjeto(this.state.form)
    } else {
      alert('Por favor vertifica que eres humano!');
    }
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      })
    }
  
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }
  validarSesion =() => {
    if (!cookies.get('UsuarioID')) {
      this.props.history.push('/login');
    }
  };
  render() {
    this.handleRegister = this.handleRegister.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    const {errors} = this.state;
    return (
      <>
        <Container>
        <br />
         <Row>
           <Col><h1>Usuarios</h1></Col>
           <Col><Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button></Col>
         </Row>
          <Table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Pregunta de seguridad</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.UsuarioID}>
                  <td>{dato.UsuarioID}</td>
                  <td>{dato.Correo}</td>
                  <td>{dato.PreguntaSeg}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminarObjeto(dato.UsuarioID)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Usuario:
              </label>
            
              <input
                className="form-control"
                name="UsuarioID"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.UsuarioID}
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
                Pregunta de seguridad: 
              </label>
              <input
                className="form-control"
                name="PreguntaSeg"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.PreguntaSeg}
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
               Usuario:
              </label>
            
              <input
              placeholder="Ingrese un usuario"
                className="form-control"
                name="UsuarioID"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.UsuarioID}
                noValidate
  
              />
                                           {errors.UsuarioID.length > 0 && 
                <span className='error'>{errors.UsuarioID}</span>}

            </FormGroup>
            
            <FormGroup>
              <label>
                Contraseña: 
              </label>
              <input
              placeholder="Ingrese una contraseña"
                className="form-control"
                name="Contrasena"
                type="password"
                onChange={this.handleChange}
                value={this.state.form.Contrasena}
                noValidate
  
              />
              
              {errors.Contrasena.length > 0 && 
                <span className='error'>{errors.Contrasena}</span>}
            </FormGroup>

         

            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
              placeholder="Ingrese un correo"
                className="form-control"
                name="Correo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Correo}
                noValidate
  
              />
              
              {errors.Correo.length > 0 && 
                <span className='error'>{errors.Correo}</span>}
            </FormGroup>

            <FormGroup>
              <label>
                Pregunta de seguridad: 
              </label>
              <input
              placeholder="Ingrese una pregunta de seguridad"
                className="form-control"
                name="PreguntaSeg"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.PreguntaSeg}
                noValidate
  
              />
              
              {errors.PreguntaSeg.length > 0 && 
                <span className='error'>{errors.PreguntaSeg}</span>}
            </FormGroup>

            <FormGroup>
              <label>
                Respuesta de seguridad: 
              </label>
              <input
              placeholder="Ingrese una respuesta de seguridad"
                className="form-control"
                name="RespuestaSeg"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.RespuestaSeg}
                noValidate
  
              />
              {errors.RespuestaSeg.length > 0 && 
                <span className='error'>{errors.RespuestaSeg}</span>}
            </FormGroup>
          </ModalBody>
          <ModalBody>
          <Recaptcha
            sitekey="6LcaJQMaAAAAAGrz88IuWRMGIdZD_CkuYrIHVpkC"
            render="explicit"
            onloadCallback={this.recaptchaLoaded}
            verifyCallback={this.verifyCallback}
          />
          </ModalBody >
          <ModalFooter>
         
            <Button
              color="primary"
              onClick={() => this.crearObjeto(this.state.form)}
              onClick={this.handleRegister}
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