
namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(Customer), Schema = "DBO")]
    public class Customer : Entity<Guid>
    {
        public required string Identification { get; set; }
        public required string Name { get; set; }
        public required string LastName { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string Address { get; set; }

        public static Customer Create(string identification, string name, string lastName, string phone, string email, string address)
        {
            var guid = Guid.NewGuid();
            return new Customer
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
