namespace IngresoYGestiónDeFacturasApi.Extension
{
    public static class InvoiceExtensions
    {
        public static IEnumerable<InvoiceDTO> ToInvoiceDTOList(this IEnumerable<Invoice> invoices) =>
       invoices.Select(i => new InvoiceDTO
       {
           Id = i.Id,
           Number = i.Number,
           CompanyId = i.CompanyId,
           SellerId = i.SellerId,
           CustomerId = i.CustomerId,
           PaymentMethod = i.PaymentMethod,
           PaymentStatus = i.PaymentStatus,
           SubTotal = i.SubTotal,
           Iva = i.Iva,
           Total = i.Total,
           CreatedAt = i.CreatedAt,
           InvoiceDetails = i.InvoiceDetails.Select(detail => new InvoiceDetailDTO
           {
               Id = detail.Id,
               InvoiceId = detail.InvoiceId,
               ProductId = detail.ProductId,
               Quantity = detail.Quantity,
               UnitPrice = detail.UnitPrice,
               Total = detail.Total
           }).ToList()
       });

        public static InvoiceDTO ToInvoiceDTO(this Invoice invoice) =>
            new()
            {

                Id = invoice.Id,
                Number = invoice.Number,
                CompanyId = invoice.CompanyId,
                SellerId = invoice.SellerId,
                CustomerId = invoice.CustomerId,
                PaymentMethod = invoice.PaymentMethod,
                PaymentStatus = invoice.PaymentStatus,
                SubTotal = invoice.SubTotal,
                Iva = invoice.Iva,
                Total = invoice.Total,
                CreatedAt = invoice.CreatedAt,
                InvoiceDetails = invoice.InvoiceDetails.Select(detail => new InvoiceDetailDTO
                {
                    Id = detail.Id,
                    InvoiceId = detail.InvoiceId,
                    ProductId = detail.ProductId,
                    Quantity = detail.Quantity,
                    UnitPrice = detail.UnitPrice,
                    Total = detail.Total
                }).ToList()
            };
    }
}
