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
    public class ClasesController : ApiController
    {
        private vvuelosEntities db = new vvuelosEntities();

        // GET: api/Clases
        public IQueryable<Clase> GetClases()
        {
            return db.Clases;
        }

        // GET: api/Clases/5
        [ResponseType(typeof(Clase))]
        public async Task<IHttpActionResult> GetClase(int id)
        {
            Clase clase = await db.Clases.FindAsync(id);
            if (clase == null)
            {
                return NotFound();
            }

            return Ok(clase);
        }

        // PUT: api/Clases/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutClase(int id, Clase clase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != clase.Codigo)
            {
                return BadRequest();
            }

            db.Entry(clase).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClaseExists(id))
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

        // POST: api/Clases
        [ResponseType(typeof(Clase))]
        public async Task<IHttpActionResult> PostClase(Clase clase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Clases.Add(clase);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ClaseExists(clase.Codigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = clase.Codigo }, clase);
        }

        // DELETE: api/Clases/5
        [ResponseType(typeof(Clase))]
        public async Task<IHttpActionResult> DeleteClase(int id)
        {
            Clase clase = await db.Clases.FindAsync(id);
            if (clase == null)
            {
                return NotFound();
            }

            db.Clases.Remove(clase);
            await db.SaveChangesAsync();

            return Ok(clase);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClaseExists(int id)
        {
            return db.Clases.Count(e => e.Codigo == id) > 0;
        }
    }
}