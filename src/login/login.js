import React, { useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login(props) {

  const baseUrl = "https://localhost:44332/api/usuarios";
  const cookies = new Cookies();

  const [form, setForm] = useState({
    UsuarioID: '',
    Contrasena: ''
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const iniciarSesion = async () => {
    await axios.get(baseUrl + `?id=${form.UsuarioID}&password=${form.Contrasena}`)
      .then(response => {
        console.log(1,response);
        return response.data;
      }).then(response => {
        console.log(2, response);
        if (response) {
          console.log(3, response);
          cookies.set('UsuarioID', response.UsuarioID, { path: '/' });
          cookies.set('Correo', response.Correo, { path: '/' });
          alert("Bienvenido: " + response.UsuarioID );
          props.history.push('/');
        } else {
          alert('El usuario o la contraseña no son correctos');
          
        }
      })

      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    if (cookies.get('UsuarioID')) {
      props.history.push('/');
    }
  }, []);

  const responseGoogle = (response) => {
    console.log(response);
    var res = response.profileObj;
    console.log(res);
  }


  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <div className="containerPrincipal">
      <div className="containerLogin">
        <div className="form-group">
          <label>Usuario: </label>
          <br />
          <input
            type="text"
            className="form-control"
            name="UsuarioID"
            onChange={handleChange}
          />
          <br />
          <label>Contraseña: </label>
          <br />
          <input
            type="password"
            className="form-control"
            name="Contrasena"
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-primary" onClick={() => iniciarSesion()}>Iniciar Sesion</button>
          <br />
          <button className="btn btn-primary"  >
            <Link to={"/registro"} className="text-white">
              Registrarse
            </Link>
          </button>

          <div className={'signature'}>
            <GoogleLogin
              clientId="1053313575276-5s5hfant6s62o4ms6teg531smh76qr6s.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle} />
            <div className="App">
              <FacebookLogin
                appId="141117857540249"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton="INICIAR SESION CON FACEBOOK"
                icon="fa-facebook" />,
                onClick= {iniciarSesion}
      </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
