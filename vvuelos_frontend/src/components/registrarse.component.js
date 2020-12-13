import React, { Component } from "react";
import RegistroDataService from "../services/registro.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,  ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import Recaptcha from 'react-recaptcha';


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
  recaptchaLoaded() {
    console.log('capcha correctamente cargado');
  }

  handleSubscribe() {
    if (this.state.isVerified) {
      alert('Usted se registro correctamente!');
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
  render() {
   
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    

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
                className="form-control"
                name="UsuarioID"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.UsuarioID}
                
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Contraseña: 
              </label>
              <input
                className="form-control"
                name="Contrasena"
                type="password"
                onChange={this.handleChange}
                value={this.state.form.Contrasena}
              
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

            <FormGroup>
              <label>
                Respuesta de seguridad: 
              </label>
              <input
                className="form-control"
                name="RespuestaSeg"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.RespuestaSeg}
                
              />
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




        
  