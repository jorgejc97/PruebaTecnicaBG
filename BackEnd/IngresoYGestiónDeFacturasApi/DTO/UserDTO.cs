namespace IngresoYGestiónDeFacturasApi.DTO
{
    public class UserDTO
    {
        public string? Id { get; set; }
        public string NameCompany { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string? Email { get; set; }
        public long Iva { get; set; } = default!;
        public string City { get; set; } = default!;
        public string RegionProvince { get; set; } = default!;
        public string Address { get; set; } = default!;
        public long Zipcode { get; set; } = default!;
    }
}
