
namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(Vendedor), Schema = "DBO")]
    public class Vendedor : Entity<Guid>
    {
        public required string Identificacion { get; set; }
        public required string Name { get; set; }
        public required string LastName { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string Adress { get; set; }
    }
}
