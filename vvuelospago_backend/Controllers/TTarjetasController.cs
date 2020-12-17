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
    public class TTarjetasController : ApiController
    {
        private vvuelospagoEntities db = new vvuelospagoEntities();

        // GET: api/TTarjetas
        public IQueryable<Transaccion_Tarjeta> GetTransaccion_Tarjeta()
        {
            return db.Transaccion_Tarjeta;
        }

        // GET: api/TTarjetas/5
        [ResponseType(typeof(Transaccion_Tarjeta))]
        public IHttpActionResult GetTransaccion_Tarjeta(int id)
        {
            Transaccion_Tarjeta transaccion_Tarjeta = db.Transaccion_Tarjeta.Find(id);
            if (transaccion_Tarjeta == null)
            {
                return NotFound();
            }

            return Ok(transaccion_Tarjeta);
        }

        // PUT: api/TTarjetas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTransaccion_Tarjeta(int id, Transaccion_Tarjeta transaccion_Tarjeta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transaccion_Tarjeta.Codigo)
            {
                return BadRequest();
            }

            db.Entry(transaccion_Tarjeta).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Transaccion_TarjetaExists(id))
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

        // POST: api/TTarjetas
        [ResponseType(typeof(Transaccion_EasyPay))]
        public IHttpActionResult PostTransaccion_Tarjeta(Transaccion_Tarjeta transaccion_Tarjeta)
        {
            Tarjeta tarjeta = db.Tarjetas.Find(transaccion_Tarjeta.Num_Tarjeta);

            if (!ModelState.IsValid)
            {
                if (tarjeta.Num_Tarjeta != transaccion_Tarjeta.Num_Tarjeta)
                {
                    if (tarjeta.Mes_Exp != transaccion_Tarjeta.Mes_Exp && tarjeta.Ano_Exp != transaccion_Tarjeta.Ano_Exp)
                    {
                        if (tarjeta.CVV != transaccion_Tarjeta.CVV)
                        {
                            if (tarjeta.Saldo<transaccion_Tarjeta.Monto)
                            {
                                return Ok("- 4");
                            }
                            return Ok("-3");
                        }
                        return Ok("-2");
                    }
                    return Ok("-1");
                }
                return Ok("Objeto no es una transaccion");
            }

            db.Transaccion_Tarjeta.Add(transaccion_Tarjeta);
            tarjeta.Saldo = tarjeta.Saldo - transaccion_Tarjeta.Monto;
            db.Entry(tarjeta).State = EntityState.Modified;
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

        private bool Transaccion_TarjetaExists(int id)
        {
            return db.Transaccion_Tarjeta.Count(e => e.Codigo == id) > 0;
        }
    }
}