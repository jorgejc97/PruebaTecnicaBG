
namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(Seller), Schema = "DBO")]
    public class Seller : Entity<Guid>
    {
        public required string Identification { get; set; }
        public required string Name { get; set; }
        public required string LastName { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string Address { get; set; }

        public static Seller Create(string identification, string name, string lastName, string phone, string email, string address)
        {
            var guid = Guid.NewGuid();
            return new Seller
            {
                Id = guid,
                Identification = identification,
                Name = name,
                LastName = lastName,
                Phone = phone,
                Email = email,
                Address = address
            };
        }

        public List<Invoice> Invoice { get; set; } = [];
    }
}
