using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using vvuelos_backend;

namespace vvuelos_backend.Controllers
{
    public class LoginController : ApiController
    {
        private vvuelosEntities db = new vvuelosEntities();

        // POST: api/Login
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult PostUsuario(Usuario usuarioLogin)
        {
            Usuario usuario = db.Usuarios.Where(Usuario => Usuario.UsuarioID.Equals(usuarioLogin.UsuarioID) && Usuario.Contrasena.Equals(usuarioLogin.Contrasena)).FirstOrDefault();
            usuario.Contrasena = string.Empty;
            usuario.PreguntaSeg = string.Empty;
            usuario.RespuestaSeg = string.Empty;
            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UsuarioExists(string id)
        {
            return db.Usuarios.Count(e => e.UsuarioID == id) > 0;
        }
    }
}