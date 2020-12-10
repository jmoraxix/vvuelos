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
    public class EstadoVuelosController : ApiController
    {
        private vvuelosEntities db = new vvuelosEntities();

        // GET: api/EstadoVuelos
        public IQueryable<EstadoVuelo> GetEstadoVueloes()
        {
            return db.EstadoVueloes;
        }

        // GET: api/EstadoVuelos/5
        [ResponseType(typeof(EstadoVuelo))]
        public async Task<IHttpActionResult> GetEstadoVuelo(int id)
        {
            EstadoVuelo estadoVuelo = await db.EstadoVueloes.FindAsync(id);
            if (estadoVuelo == null)
            {
                return NotFound();
            }

            return Ok(estadoVuelo);
        }

        // PUT: api/EstadoVuelos/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutEstadoVuelo(int id, EstadoVuelo estadoVuelo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estadoVuelo.Codigo)
            {
                return BadRequest();
            }

            db.Entry(estadoVuelo).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstadoVueloExists(id))
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

        // POST: api/EstadoVuelos
        [ResponseType(typeof(EstadoVuelo))]
        public async Task<IHttpActionResult> PostEstadoVuelo(EstadoVuelo estadoVuelo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EstadoVueloes.Add(estadoVuelo);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EstadoVueloExists(estadoVuelo.Codigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = estadoVuelo.Codigo }, estadoVuelo);
        }

        // DELETE: api/EstadoVuelos/5
        [ResponseType(typeof(EstadoVuelo))]
        public async Task<IHttpActionResult> DeleteEstadoVuelo(int id)
        {
            EstadoVuelo estadoVuelo = await db.EstadoVueloes.FindAsync(id);
            if (estadoVuelo == null)
            {
                return NotFound();
            }

            db.EstadoVueloes.Remove(estadoVuelo);
            await db.SaveChangesAsync();

            return Ok(estadoVuelo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EstadoVueloExists(int id)
        {
            return db.EstadoVueloes.Count(e => e.Codigo == id) > 0;
        }
    }
}