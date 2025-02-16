namespace IngresoYGestiónDeFacturasApi.DTO
{
    public class InvoiceDTO
    {
        public Guid? Id { get; set; }
        public long Number { get; set; } = default!;
        public required Guid CompanyId { get; set; }
        public required Guid CustomerId { get; set; }
        public required Guid SellerId { get; set; }
        public string PaymentMethod { get; set; } = default!;
        public string PaymentStatus { get; set; } = default!;
        public decimal SubTotal { get; set; } = default!;
        public decimal Iva { get; set; } = default!;
        public decimal Total { get; set; } = default!;
        public DateTime? CreatedAt { get; set; }
        public required List<InvoiceDetailDTO> InvoiceDetails { get; set; }
    }
}
