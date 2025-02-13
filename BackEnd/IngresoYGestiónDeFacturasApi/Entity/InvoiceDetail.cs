namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(InvoiceDetail), Schema = "DBO")]
    public class InvoiceDetail : Entity<Guid>
    {
        public required Guid InvoiceId { get; set; }
        public required Invoice Invoice { get; set; }
        public required Guid ProductId { get; set; }
        public required Product Product { get; set; }
        public required long Quantity { get; set; }
        public required decimal UnitPrice { get; set; }
        public required decimal Total { get; set; }
    }
}
