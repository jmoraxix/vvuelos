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
    public class TipoPagosController : ApiController
    {
        private vvuelosEntities db = new vvuelosEntities();

        // GET: api/TipoPagos
        public IQueryable<TipoPago> GetTipoPagoes()
        {
            return db.TipoPagoes;
        }

        // GET: api/TipoPagos/5
        [ResponseType(typeof(TipoPago))]
        public async Task<IHttpActionResult> GetTipoPago(int id)
        {
            TipoPago tipoPago = await db.TipoPagoes.FindAsync(id);
            if (tipoPago == null)
            {
                return NotFound();
            }

            return Ok(tipoPago);
        }

        // PUT: api/TipoPagos/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTipoPago(int id, TipoPago tipoPago)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipoPago.Codigo)
            {
                return BadRequest();
            }

            db.Entry(tipoPago).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoPagoExists(id))
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

        // POST: api/TipoPagos
        [ResponseType(typeof(TipoPago))]
        public async Task<IHttpActionResult> PostTipoPago(TipoPago tipoPago)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TipoPagoes.Add(tipoPago);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TipoPagoExists(tipoPago.Codigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tipoPago.Codigo }, tipoPago);
        }

        // DELETE: api/TipoPagos/5
        [ResponseType(typeof(TipoPago))]
        public async Task<IHttpActionResult> DeleteTipoPago(int id)
        {
            TipoPago tipoPago = await db.TipoPagoes.FindAsync(id);
            if (tipoPago == null)
            {
                return NotFound();
            }

            db.TipoPagoes.Remove(tipoPago);
            await db.SaveChangesAsync();

            return Ok(tipoPago);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TipoPagoExists(int id)
        {
            return db.TipoPagoes.Count(e => e.Codigo == id) > 0;
        }
    }
}