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
using vvuelospago_backend;

namespace vvuelospago_backend.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "http://localhost:3001, http://localhost:3000", headers: "*", methods: "*")]
    public class EasyPaysController : ApiController
    {
        private vvuelospagoEntities db = new vvuelospagoEntities();

        // GET: api/EasyPays
        public IQueryable<EasyPay> GetEasyPays()
        {
            return db.EasyPays;
        }

        // GET: api/EasyPays/5
        [ResponseType(typeof(EasyPay))]
        public IHttpActionResult GetEasyPay(int id)
        {
            EasyPay easyPay = db.EasyPays.Find(id);
            if (easyPay == null)
            {
                return NotFound();
            }

            return Ok(easyPay);
        }

        // PUT: api/EasyPays/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEasyPay(int id, EasyPay easyPay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != easyPay.Num_Cuenta)
            {
                return BadRequest();
            }

            db.Entry(easyPay).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EasyPayExists(id))
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

        // POST: api/EasyPays
        [ResponseType(typeof(EasyPay))]
        public IHttpActionResult PostEasyPay(EasyPay easyPay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EasyPays.Add(easyPay);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (EasyPayExists(easyPay.Num_Cuenta))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = easyPay.Num_Cuenta }, easyPay);
        }

        // DELETE: api/EasyPays/5
        [ResponseType(typeof(EasyPay))]
        public IHttpActionResult DeleteEasyPay(int id)
        {
            EasyPay easyPay = db.EasyPays.Find(id);
            if (easyPay == null)
            {
                return NotFound();
            }

            db.EasyPays.Remove(easyPay);
            db.SaveChanges();

            return Ok(easyPay);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EasyPayExists(int id)
        {
            return db.EasyPays.Count(e => e.Num_Cuenta == id) > 0;
        }
    }
}