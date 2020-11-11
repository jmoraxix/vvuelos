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

namespace vvuelos_backend.Controllers
{
    public class PaisController : ApiController
    {
        private vvuelosEntities db = new vvuelosEntities();

        // GET: api/Pais
        public IQueryable<Pai> GetPais()
        {
            return db.Pais;
        }

        // GET: api/Pais/5
        [ResponseType(typeof(Pai))]
        public async Task<IHttpActionResult> GetPai(string id)
        {
            Pai pai = await db.Pais.FindAsync(id);
            if (pai == null)
            {
                return NotFound();
            }

            return Ok(pai);
        }

        // PUT: api/Pais/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPai(string id, Pai pai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pai.Consecutivo)
            {
                return BadRequest();
            }

            db.Entry(pai).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaiExists(id))
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

        // POST: api/Pais
        [ResponseType(typeof(Pai))]
        public async Task<IHttpActionResult> PostPai(Pai pai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Pais.Add(pai);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PaiExists(pai.Consecutivo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = pai.Consecutivo }, pai);
        }

        // DELETE: api/Pais/5
        [ResponseType(typeof(Pai))]
        public async Task<IHttpActionResult> DeletePai(string id)
        {
            Pai pai = await db.Pais.FindAsync(id);
            if (pai == null)
            {
                return NotFound();
            }

            db.Pais.Remove(pai);
            await db.SaveChangesAsync();

            return Ok(pai);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PaiExists(string id)
        {
            return db.Pais.Count(e => e.Consecutivo == id) > 0;
        }
    }
}