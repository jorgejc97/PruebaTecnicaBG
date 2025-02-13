namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(Invoice), Schema = "DBO")]
    public class Invoice : Entity<Guid>
    {
        public required string Code { get; set; }
        public required Guid CompanyId { get; set; }
        public required User User { get; set; }
        public required Guid CustomerId { get; set; }
        public required Customer Customer { get; set; }
        public required Guid SellerId { get; set; }
        public required Seller Seller { get; set; }
        public required Guid PaymantMethodId { get; set; }
        public required PaymentMethod PaymentMethod { get; set; }
        public required Guid PaymantStatusId { get; set; }
        public required PaymentStatus PaymentStatus { get; set; }
        public required decimal SubTotal { get; set; }
        public required long IVA { get; set; }
        public required decimal Total { get; set; }
        public required List<InvoiceDetail> InvoiceDetail { get; set; }

    }
}
