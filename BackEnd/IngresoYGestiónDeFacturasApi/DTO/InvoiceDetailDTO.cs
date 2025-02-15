namespace IngresoYGestiónDeFacturasApi.DTO
{
    public class InvoiceDetailDTO
    {

        public Guid? Id { get; set; }
        public Guid? InvoiceId { get; set; }
        public required Guid ProductId { get; set; }
        public long Quantity { get; set; } = default!;
        public decimal UnitPrice { get; set; } = default!;
        public decimal Total { get; set; } = default!;
    }
}
