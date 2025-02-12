
namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(Cliente), Schema = "DBO")]
    public class Cliente : Entity<Guid>
    {
        public required string Identificacion { get; set; }
        public required string Name { get; set; }
        public required string LastName { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string Adress { get; set; }
    }
}
