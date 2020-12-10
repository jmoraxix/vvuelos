using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using vvuelos_backend;
using System.Web.Http.Cors;
namespace vvuelos_backend.Controllers
{
    [EnableCors(origins: "http://localhost:3001", headers: "*", methods: "*")]
    public class RolsController : ApiController
    {
        private vvuelosEntities db = new vvuelosEntities();

        // GET: api/Rols
        public IQueryable<Rol> GetRols()
        {
            return db.Rols;
        }

        // GET: api/Rols/5
        [ResponseType(typeof(Rol))]
        public async Task<IHttpActionResult> GetRol(int id)
        {
            Rol rol = await db.Rols.FindAsync(id);
            if (rol == null)
            {
                return NotFound();
            }

            return Ok(rol);
        }

        // PUT: api/Rols/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRol(int id, Rol rol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rol.Codigo)
            {
                return BadRequest();
            }

            db.Entry(rol).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Rols
        [ResponseType(typeof(Rol))]
        public async Task<IHttpActionResult> PostRol(Rol rol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Rols.Add(rol);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RolExists(rol.Codigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = rol.Codigo }, rol);
        }

        // DELETE: api/Rols/5
        [ResponseType(typeof(Rol))]
        public async Task<IHttpActionResult> DeleteRol(int id)
        {
            Rol rol = await db.Rols.FindAsync(id);
            if (rol == null)
            {
                return NotFound();
            }

            db.Rols.Remove(rol);
            await db.SaveChangesAsync();

            return Ok(rol);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RolExists(int id)
        {
            return db.Rols.Count(e => e.Codigo == id) > 0;
        }
    }
}