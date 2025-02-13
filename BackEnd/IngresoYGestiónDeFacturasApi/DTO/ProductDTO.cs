namespace IngresoYGestiónDeFacturasApi.DTO
{
    public class ProductDTO
    {
        public Guid? Id { get; set; }
        public string Code { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public long Quantity { get; set; } = default!;
        public decimal UnitPrice { get; set; } = default!;
        public bool Active { get; set; } = default!;

    }
}
