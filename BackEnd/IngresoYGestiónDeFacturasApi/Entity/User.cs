
namespace IngresoYGestiónDeFacturasApi.Entity
{
    public class User : IdentityUser
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string NameCompany { get; set; }
        public required long Iva { get; set; }
        public required string City { get; set; }
        public required string RegionProvince { get; set; }
        public required string Address { get; set; }
        public required long Zipcode { get; set; }
        public List<Invoice> Invoice { get; set; } = [];
    }
}
