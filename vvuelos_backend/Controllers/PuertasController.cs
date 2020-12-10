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
    public class PuertasController : ApiController
    {
        private vvuelosEntities db = new vvuelosEntities();

        // GET: api/Puertas
        public IQueryable<Puerta> GetPuertas()
        {
            return db.Puertas;
        }

        // GET: api/Puertas/5
        [ResponseType(typeof(Puerta))]
        public async Task<IHttpActionResult> GetPuerta(string id)
        {
            Puerta puerta = await db.Puertas.FindAsync(id);
            if (puerta == null)
            {
                return NotFound();
            }

            return Ok(puerta);
        }

        // PUT: api/Puertas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPuerta(string id, Puerta puerta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != puerta.Consecutivo)
            {
                return BadRequest();
            }

            db.Entry(puerta).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PuertaExists(id))
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

        // POST: api/Puertas
        [ResponseType(typeof(Puerta))]
        public async Task<IHttpActionResult> PostPuerta(Puerta puerta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Puertas.Add(puerta);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PuertaExists(puerta.Consecutivo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = puerta.Consecutivo }, puerta);
        }

        // DELETE: api/Puertas/5
        [ResponseType(typeof(Puerta))]
        public async Task<IHttpActionResult> DeletePuerta(string id)
        {
            Puerta puerta = await db.Puertas.FindAsync(id);
            if (puerta == null)
            {
                return NotFound();
            }

            db.Puertas.Remove(puerta);
            await db.SaveChangesAsync();

            return Ok(puerta);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PuertaExists(string id)
        {
            return db.Puertas.Count(e => e.Consecutivo == id) > 0;
        }
    }
}