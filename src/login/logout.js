import React from "react";
import Cookies from 'universal-cookie';

export default function logout (props) {

  const cookies = new Cookies();
  cookies.remove('UsuarioID', { path: '/' });
  cookies.remove('Contrasena', { path: '/' });
  props.history.push('/');

  return (
    <>
      <h1>Cerrando Sesion</h1>
    </>
  );
}
    