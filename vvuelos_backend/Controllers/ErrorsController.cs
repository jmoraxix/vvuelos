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
using System.Web.Http.Cors;
using System.Web.Http.Description;
using vvuelos_backend;

namespace vvuelos_backend.Controllers
{
    [EnableCors(origins: "http://localhost:3001, http://localhost:3000", headers: "*", methods: "*")]
    public class ErrorsController : ApiController
    {
        private vvuelosEntities db = new vvuelosEntities();

        // GET: api/Errors
        public IQueryable<Error> GetErrors()
        {
            return db.Errors;
        }

        // GET: api/Errors/5
        [ResponseType(typeof(Error))]
        public async Task<IHttpActionResult> GetError(int id)
        {
            Error error = await db.Errors.FindAsync(id);
            if (error == null)
            {
                return NotFound();
            }

            return Ok(error);
        }

        // PUT: api/Errors/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutError(int id, Error error)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != error.Codigo)
            {
                return BadRequest();
            }

            db.Entry(error).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ErrorExists(id))
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

        // POST: api/Errors
        [ResponseType(typeof(Error))]
        public async Task<IHttpActionResult> PostError(Error error)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Errors.Add(error);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = error.Codigo }, error);
        }

        // DELETE: api/Errors/5
        [ResponseType(typeof(Error))]
        public async Task<IHttpActionResult> DeleteError(int id)
        {
            Error error = await db.Errors.FindAsync(id);
            if (error == null)
            {
                return NotFound();
            }

            db.Errors.Remove(error);
            await db.SaveChangesAsync();

            return Ok(error);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ErrorExists(int id)
        {
            return db.Errors.Count(e => e.Codigo == id) > 0;
        }
    }
}