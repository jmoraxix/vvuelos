//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace vvuelos_backend
{
    using System;
    using System.Collections.Generic;
    
    public partial class Reservacion
    {
        public string Consecutivo { get; set; }
        public string UsuarioID { get; set; }
        public string VueloID { get; set; }
        public int TipoPagoID { get; set; }
        public System.DateTime Fecha { get; set; }
        public int CantidadCampos { get; set; }
    
        public virtual TipoPago TipoPago { get; set; }
        public virtual Usuario Usuario { get; set; }
        public virtual Vuelo Vuelo { get; set; }
    }
}
