namespace IngresoYGestiónDeFacturasApi.Entity
{
    [Table(nameof(Invoice), Schema = "DBO")]
    public class Invoice : Entity<Guid>
    {
        public required long Number { get; set; }
        public required Guid CompanyId { get; set; }
        public User? User { get; set; }
        public required Guid CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public required Guid SellerId { get; set; }
        public Seller? Seller { get; set; }
        public required string PaymentMethod { get; set; }
        public required string PaymentStatus { get; set; }
        public required decimal SubTotal { get; set; }
        public required decimal Iva { get; set; }
        public required decimal Total { get; set; }

        public static Invoice Create(long number, Guid companyId, Guid customerId, Guid sellerId, string paymentMethod, string paymentStatus, decimal subtotal, decimal iva, decimal total, List<InvoiceDetailDTO> invoiceDetailDTOs)
        {
            var guid = Guid.NewGuid();
            return new Invoice
            {
                Id = guid,
                Number = number,
                CompanyId = companyId,
                CustomerId = customerId,
                SellerId = sellerId,
                PaymentStatus = paymentStatus,
                PaymentMethod = paymentMethod,
                SubTotal = subtotal,
                Iva = iva,
                Total = total,
                InvoiceDetails = invoiceDetailDTOs.Select(x => InvoiceDetail.Create(guid, x.ProductId, x.Quantity, x.UnitPrice, x.Total)).ToList(),
            };

        }

        public required List<InvoiceDetail> InvoiceDetails { get; set; }

    }
}
