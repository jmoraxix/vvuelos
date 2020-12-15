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
    public class ConsecutivosController : ApiController
    {
        private vvuelosEntities db = new vvuelosEntities();

        // GET: api/Consecutivos
        public IQueryable<Consecutivo> GetConsecutivoes()
        {
            return db.Consecutivoes;
        }

        // GET: api/Consecutivos/5
        [ResponseType(typeof(Consecutivo))]
        public async Task<IHttpActionResult> GetConsecutivo(int id)
        {
            Consecutivo consecutivo = await db.Consecutivoes.FindAsync(id);
            if (consecutivo == null)
            {
                return NotFound();
            }

            return Ok(consecutivo);
        }

        // PUT: api/Consecutivos/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutConsecutivo(int id, Consecutivo consecutivo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != consecutivo.Codigo)
            {
                return BadRequest();
            }

            db.Entry(consecutivo).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsecutivoExists(id))
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

        // POST: api/Consecutivos
        [ResponseType(typeof(Consecutivo))]
        public async Task<IHttpActionResult> PostConsecutivo(Consecutivo consecutivo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Consecutivoes.Add(consecutivo);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ConsecutivoExists(consecutivo.Codigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = consecutivo.Codigo }, consecutivo);
        }

        // DELETE: api/Consecutivos/5
        [ResponseType(typeof(Consecutivo))]
        public async Task<IHttpActionResult> DeleteConsecutivo(int id)
        {
            Consecutivo consecutivo = await db.Consecutivoes.FindAsync(id);
            if (consecutivo == null)
            {
                return NotFound();
            }

            db.Consecutivoes.Remove(consecutivo);
            await db.SaveChangesAsync();

            return Ok(consecutivo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ConsecutivoExists(int id)
        {
            return db.Consecutivoes.Count(e => e.Codigo == id) > 0;
        }
    }
}