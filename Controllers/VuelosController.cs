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
    [EnableCors(origins: "http://localhost:3001, http://localhost:3000", headers: "*", methods: "*")]

    public class VuelosController : ApiController
    {
        private vvuelosEntities db = new vvuelosEntities();

        // GET: api/Vuelos
        public IQueryable<Vuelo> GetVueloes()
        {
            return db.Vueloes;
        }

        // GET: api/Vuelos/5
        [ResponseType(typeof(Vuelo))]
        public async Task<IHttpActionResult> GetVuelo(string id)
        {
            Vuelo vuelo = await db.Vueloes.FindAsync(id);
            if (vuelo == null)
            {
                return NotFound();
            }

            return Ok(vuelo);
        }

        // PUT: api/Vuelos/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutVuelo(string id, Vuelo vuelo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vuelo.Consecutivo)
            {
                return BadRequest();
            }

            db.Entry(vuelo).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VueloExists(id))
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

        // POST: api/Vuelos
        [ResponseType(typeof(Vuelo))]
        public async Task<IHttpActionResult> PostVuelo(Vuelo vuelo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Vueloes.Add(vuelo);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VueloExists(vuelo.Consecutivo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = vuelo.Consecutivo }, vuelo);
        }

        // DELETE: api/Vuelos/5
        [ResponseType(typeof(Vuelo))]
        public async Task<IHttpActionResult> DeleteVuelo(string id)
        {
            Vuelo vuelo = await db.Vueloes.FindAsync(id);
            if (vuelo == null)
            {
                return NotFound();
            }

            db.Vueloes.Remove(vuelo);
            await db.SaveChangesAsync();

            return Ok(vuelo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VueloExists(string id)
        {
            return db.Vueloes.Count(e => e.Consecutivo == id) > 0;
        }
    }
}