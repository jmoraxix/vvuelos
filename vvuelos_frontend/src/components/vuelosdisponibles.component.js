import React, { Component } from "react";
import RegistroDataService from "../services/registro.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, FormGroup } from 'reactstrap';

export default class VueloDisponible extends Component {
    state = {
        data: [],
        isVerified: false,
        form: {
          Consecutivo: "",
          Nombre: "",
          PaisOri:"",
          PaisDest: "",
          FechaHoraSal:"",
          Puerta: "",
          EstadoVuelo:"",
          Precio:"",
          Capacidad: "" 
        }
    };
    render() {

        return (
            <>
      
              <div><h3 >Vuelos disponibles</h3></div>
      
              <FormGroup>
                <label>
                  Consecutivo
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
      
              <Recaptcha
                sitekey="6LcaJQMaAAAAAGrz88IuWRMGIdZD_CkuYrIHVpkC"
                render="explicit"
                onloadCallback={this.recaptchaLoaded}
                verifyCallback={this.verifyCallback}
              />
      
              <Button
                color="primary"
                onClick={() => this.crearObjeto(this.state.form)}
              // onClick={this.handleRegistro}
              >
                Registrarse
                  </Button>
              <Button className="btn btn-danger">
                <Link to={"/login"} className="text-white">
                  Volver
                  </Link>
              </Button>
            </>
          );
                }
            }