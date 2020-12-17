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
    public class TEasyPaysController : ApiController
    {
        private vvuelospagoEntities db = new vvuelospagoEntities();

        // GET: api/TEasyPays
        public IQueryable<Transaccion_EasyPay> GetTransaccion_EasyPay()
        {
            return db.Transaccion_EasyPay;
        }

        // GET: api/TEasyPays/5
        [ResponseType(typeof(Transaccion_EasyPay))]
        public IHttpActionResult GetTransaccion_EasyPay(int id)
        {
            Transaccion_EasyPay transaccion_EasyPay = db.Transaccion_EasyPay.Find(id);
            if (transaccion_EasyPay == null)
            {
                return NotFound();
            }

            return Ok(transaccion_EasyPay);
        }

        // PUT: api/TEasyPays/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTransaccion_EasyPay(int id, Transaccion_EasyPay transaccion_EasyPay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transaccion_EasyPay.Codigo)
            {
                return BadRequest();
            }

            db.Entry(transaccion_EasyPay).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Transaccion_EasyPayExists(id))
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

        // POST: api/TEasyPays
        [ResponseType(typeof(Transaccion_EasyPay))]
        public IHttpActionResult PostTransaccion_EasyPay(Transaccion_EasyPay transaccion_EasyPay)
        {
            EasyPay easypay = db.EasyPays.Find(transaccion_EasyPay.Num_Cuenta);

            if (!ModelState.IsValid)
            {
                if (easypay.Num_Cuenta != transaccion_EasyPay.Num_Cuenta)
                {
                    if (easypay.Codigo_Seguridad != transaccion_EasyPay.Codigo_Seguridad)
                    {
                        if (easypay.Contrasena != transaccion_EasyPay.Contrasena)
                        {
                            if (easypay.Saldo < transaccion_EasyPay.Monto)
                            {
                                return Ok("-4");
                            }
                            return Ok("-3");
                        }
                        return Ok("-2");
                    }
                    return Ok("-1");
                }
                return Ok("Objeto no es una transaccion");
            }

            db.Transaccion_EasyPay.Add(transaccion_EasyPay);
            easypay.Saldo = easypay.Saldo - transaccion_EasyPay.Monto;
            db.Entry(easypay).State = EntityState.Modified;
            db.SaveChanges();

            return Ok("0");
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Transaccion_EasyPayExists(int id)
        {
            return db.Transaccion_EasyPay.Count(e => e.Codigo == id) > 0;
        }
    }
}