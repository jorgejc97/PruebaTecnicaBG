namespace IngresoYGestiónDeFacturasApi.DTO
{
    public class SellerDTO
    {
        public Guid? Id { get; set; }
        public string Identification { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Phone { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Address { get; set; } = default!;
        public DateTime? CreatedAt { get; set; }
        public bool? Active { get; set; }
    }
}
