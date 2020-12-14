import React, { useEffect } from "react";
import Cookies from 'universal-cookie';

export default function logout (props) {


  const cookies = new Cookies();

  const cerrarSesion = () => {
    cookies.remove('UsuarioID', { path: '/' });
    cookies.remove('Contrasena', { path: '/' });
    props.history.push('/login');
  }

  return (
    <>
      <h1>Cerrando Sesion</h1>
    </>
  );
}
    