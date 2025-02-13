namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(Product), Schema = "DBO")]
    public class Product : Entity<Guid>
    {
        public required string Code { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required long Quantity { get; set; }
        public required decimal UnitPrice { get; set; }

        public static Product Create(string code, string name, string description, long quantity, decimal unitPrice)
        {
            var guid = Guid.NewGuid();
            return new Product
            {
                Id = guid,
                Code = code,
                Name = name,
                Description = description,
                Quantity = quantity,
                UnitPrice = unitPrice
            };
        }

        public List<InvoiceDetail> InvoiceDetail { get; set; } = [];
    }
}
