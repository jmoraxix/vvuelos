﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace vvuelospago_backend
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class vvuelospagoEntities : DbContext
    {
        public vvuelospagoEntities()
            : base("name=vvuelospagoEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<EasyPay> EasyPays { get; set; }
        public virtual DbSet<Tarjeta> Tarjetas { get; set; }
        public virtual DbSet<Transaccion_EasyPay> Transaccion_EasyPay { get; set; }
        public virtual DbSet<Transaccion_Tarjeta> Transaccion_Tarjeta { get; set; }
    }
}
