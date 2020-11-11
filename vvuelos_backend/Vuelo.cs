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
    
    public partial class Vuelo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Vuelo()
        {
            this.Reservacions = new HashSet<Reservacion>();
        }
    
        public string Consecutivo { get; set; }
        public string AerolineaID { get; set; }
        public string PaisDestinoID { get; set; }
        public System.DateTime FechaHoraSalida { get; set; }
        public string PuertaID { get; set; }
        public int EstadoVueloID { get; set; }
    
        public virtual Aerolinea Aerolinea { get; set; }
        public virtual EstadoVuelo EstadoVuelo { get; set; }
        public virtual Pai Pai { get; set; }
        public virtual Puerta Puerta { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Reservacion> Reservacions { get; set; }
    }
}
