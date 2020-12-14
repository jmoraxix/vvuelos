import React, { Component } from "react";
import RegistroDataService from "../services/registro.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,  ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import Recaptcha from 'react-recaptcha';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export default class Registrarse extends Component {

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
    this.listarObjetos();
  }

  listarObjetos() {
    RegistroDataService.getAll()
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
    RegistroDataService.create(data)
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
    RegistroDataService.update(data.UsuarioID, data)
        .then(response => {
          console.log(response.data);
          this.listarObjetos();
          this.cerrarModalActualizar();
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
  render() {
   
    this.handleRegister = this.handleRegister.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    const {errors} = this.state;

    return (
      <>
 

 <ModalHeader>
           <div><h3 >Crea tu cuenta</h3></div>
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
             // onClick={this.handleSubscribe}
            >
              Registrarse
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          
          </ModalFooter>
</>
);
  }}




        
  