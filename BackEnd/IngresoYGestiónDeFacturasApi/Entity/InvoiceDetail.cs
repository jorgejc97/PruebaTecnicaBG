namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(InvoiceDetail), Schema = "DBO")]
    public class InvoiceDetail : Entity<Guid>
    {
        public required Guid InvoiceId { get; set; }
        public Invoice? Invoice { get; set; }
        public required Guid ProductId { get; set; }
        public Product? Product { get; set; }
        public required long Quantity { get; set; }
        public required decimal UnitPrice { get; set; }
        public required decimal Total { get; set; }

        public static InvoiceDetail Create(
           Guid invoiceId, Guid productId, long quantity, decimal unitPrice, decimal total)
        {
            var guid = Guid.NewGuid();
            return new()
            {
                Id = guid,
                InvoiceId = invoiceId,
                ProductId = productId,
                Quantity = quantity,
                UnitPrice = unitPrice,
                Total = total
            };
        }
    }
}
